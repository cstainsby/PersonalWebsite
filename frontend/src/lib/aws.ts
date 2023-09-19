import { v4 as uuidv4 } from 'uuid'
import { SendEmailCommand, 
    type SendEmailCommandInput,
    type SendEmailCommandOutput,
    SESClient } from "@aws-sdk/client-ses"
import { DynamoDBClient, 
    PutItemCommand,
    QueryCommand, 
    type PutItemCommandInput} from "@aws-sdk/client-dynamodb";

import type { Email } from "./templates/Email";
import type { JobApplication } from "./templates/JobApplication";


const sesClient = new SESClient();
const dynamoDBClient = new DynamoDBClient({ 
    region: "us-west-2"
});


// Define the table name and sort key value
const JOB_APPLICATION_TABLE = 'JobApplication';
// const JOB_APPLICATION_TABLE_SORT_KEY = 'userId';

/**
 * send an Email using SES
 * @param email 
 * @returns EmailCommandOutput or null
 */
async function sendEmailViaSES(email: Email): Promise<SendEmailCommandOutput> {

    const emailStr = `
        New Email From Personal Website\n
        From: ${email.fullName}\n
        Email: ${email.theirEmail}\n

        ${email.theirMessage}
    `

    const emailInputs: SendEmailCommandInput = {
        Source: "c.p.stainsby@outlook.com",
        Destination: {
            ToAddresses: [
                "c.p.stainsby@outlook.com"
            ]
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Email From Personal Website'
            },
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: emailStr
                }
            }
        }
    }


    const sendCmd: SendEmailCommand = new SendEmailCommand(emailInputs)
    
    try {
        const res: SendEmailCommandOutput = await sesClient.send(sendCmd);
        return res;
    } catch (e) {
        console.log("AWS Error: " + e);
        throw e
    }
    
}

/**
 * Finds all job applications that a user has added to the database
 * @param userId 
 * @returns job applications sorted by userId
 */
async function getUserJobApplications(userId: string): Promise<JobApplication[]> {
    let response: JobApplication[] = [];

    // Define the query parameters
    const params = {
        TableName: JOB_APPLICATION_TABLE,
        KeyConditionExpression: '#sk = :sk',
        ExpressionAttributeNames: {
            '#sk': 'userId'
        },
        ExpressionAttributeValues: {
            ':sk': { S: userId }
        }
    };

    try {
        const command = new QueryCommand(params);
        const response = await dynamoDBClient.send(command);
    } catch (error) {
        console.error(error);
    }

    return response
}

async function putUserJobApplication(userJobApplication: JobApplication) {
    let params: PutItemCommandInput = {
        TableName: JOB_APPLICATION_TABLE,
        Item: {
            applicationId: { S: uuidv4() },
            userId: { S: userJobApplication.applicantId },
            companyName: { S: userJobApplication.companyName },
            positionName: { S: userJobApplication.positionName },
            appliedOn : { S: userJobApplication.appliedOn.toDateString() },
            locations: { L: userJobApplication.locations.map(location => {
                return { M: {
                    cityName: { S: location.cityName},
                    countryName: { S: location.cityName },
                    ...(location.stateName && { stateName : { S: location.stateName }}),
                    ...(location.address && { address : { S: location.address }}),
                }}
            })},
            referencesUsed: { L: userJobApplication.referencesUsed.map(reference => {
                return { M: {
                    firstName: { S: reference.firstName},
                    lastName: { S: reference.lastName },
                    ...(reference.phoneNumber && { phoneNumber : { N: reference.phoneNumber.toString() }}),
                    ...(reference.linkedin && { linkedin : { S: reference.linkedin }}),
                    ...(reference.worksAt && { worksAt : { S: reference.worksAt }}),
                }}
            })},

            //optional attributes
            ...(userJobApplication.positionId && { positionId : { S: userJobApplication.positionId }}),
            ...(userJobApplication.postedOn && { postedOn : { S: userJobApplication.postedOn.toDateString() }}),
            ...(userJobApplication.responsibilities && { responsibilities : { S: userJobApplication.responsibilities }}),
            ...(userJobApplication.requirements && { requirements : { S: userJobApplication.requirements }}),
            ...(userJobApplication.salaryRangeLow && { salaryRangeLow : { N: userJobApplication.salaryRangeLow.toString() }}),
            ...(userJobApplication.salaryRangeHigh && { salaryRangeHigh : { N: userJobApplication.salaryRangeHigh.toString() }}),
            ...(userJobApplication.rejected && { rejected : { S: userJobApplication.rejected }}),
            ...(userJobApplication.status && { status : { S: userJobApplication.status }}),
        }
      };
      
      try {
        const command = new PutItemCommand(params);
        await dynamoDBClient.send(command);
        console.log('Item added successfully!');
    } catch (error) {
        console.error(error);
    }
} 

export {
    sendEmailViaSES,
    getUserJobApplications,
    putUserJobApplication
}