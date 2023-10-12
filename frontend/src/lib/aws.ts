import { v4 as uuidv4 } from 'uuid'
import { SendEmailCommand, 
    type SendEmailCommandInput,
    type SendEmailCommandOutput,
    SESClient } from "@aws-sdk/client-ses"
import { GetObjectCommand, 
    S3Client } from "@aws-sdk/client-s3";


import type { Email } from "./templates/Email";
import type { JobApplication } from "./templates/JobApplication";


const sesClient = new SESClient({
    region: "us-west-2"
});
const s3Client = new S3Client({});


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
 * Get website data blob from s3 by a website ID 
 * @param websiteID 
 * @returns 
 */
async function getWebsiteData(websiteID: string) {
    const bucketName = "cstainsby-personal-website-bucket"
    const objectKey = "site-data/cole-stainsby.json"

    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
    })

    
  try {
        const response = await s3Client.send(getCommand);

        if (response.Body === undefined) {
            throw new Error("Missing json data returned from s3 GET call")
        }

        const siteJsonBody = await response.Body;
        const encoding = await siteJsonBody.transformToString();

        if (encoding === undefined) {
            throw new Error("Error getting encoding from site body")
        }
        console.log(encoding);


        return JSON.parse(encoding);
  } catch (err) {
        console.error(err);
  }
}

export {
    sendEmailViaSES,
    getWebsiteData
}