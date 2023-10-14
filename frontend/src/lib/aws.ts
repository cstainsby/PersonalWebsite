import { v4 as uuidv4 } from 'uuid'
import { 
    SendEmailCommand, 
    type SendEmailCommandInput,
    type SendEmailCommandOutput,
    SESClient 
} from "@aws-sdk/client-ses"
import { 
    GetObjectCommand, 
    PutObjectCommand,
    S3Client 
} from "@aws-sdk/client-s3";


import type { Email } from "./templates/Email";
import type { WebsiteData } from './templates/WebsiteData';

import { 
    S3_STORAGE_BUCKET
} from "$env/static/private";


const sesClient = new SESClient({});
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
 * Gets the correct path to the website's data on s3 based on the url that is used to access the site.
 * NOTE: This site should be accessable via multiple root urls which will be unique to a data source.
 *       There is a dedicated "page routing object" which can be read to determine where to find the data.
 * @param urlKey 
 */
async function getDataRouteS3(urlKey: string) {
    const directoryKey = "site-directory.json"
    const getCommand = new GetObjectCommand({
        Bucket: S3_STORAGE_BUCKET,
        Key: directoryKey
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

        const routeInfo = JSON.parse(encoding)[urlKey]

        return routeInfo;
    } catch (err) {
        console.error(err);
    }
    return {}
}

/**
 * Get website data blob from s3 by a website ID 
 * @param websiteKey 
 * @returns WebsiteData or undefined
 */
async function getWebsiteDataS3(websiteKey: string): Promise<WebsiteData | undefined> {
    const getCommand = new GetObjectCommand({
        Bucket: S3_STORAGE_BUCKET,
        Key: websiteKey
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

        return JSON.parse(encoding);
    } catch (err) {
        console.error(err);
    }
    return undefined
}

/**
 * puts a new website data version into s3 bucket with corresponding website Key
 * @param websiteKey 
 * @param websiteData 
 */
async function putWebsiteDataS3(websiteKey: string, websiteData: WebsiteData) {
    const putCommand = new PutObjectCommand({
        Bucket: S3_STORAGE_BUCKET,
        Key: websiteKey,
        Body: JSON.stringify(websiteData),
    });

    try {
        const response = await s3Client.send(putCommand);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Get readme data from s3
 * @param readmePath 
 * @returns readme data or empty string
 */
async function getReadmeS3(readmeKey: string): Promise<string> {
    const getCommand = new GetObjectCommand({
        Bucket: S3_STORAGE_BUCKET,
        Key: readmeKey
    })
    
    try {
        const response = await s3Client.send(getCommand);

        if (response.Body === undefined) {
            throw new Error("Missing readme data returned from s3 GET call")
        }

        const siteJsonBody = await response.Body;
        const encoding = await siteJsonBody.transformToString();

        if (encoding === undefined) {
            throw new Error("Error getting encoding from site body")
        }

        return encoding
    } catch (err) {
        console.error(err);
    }
    return ""
}

export {
    sendEmailViaSES,
    getDataRouteS3,
    getWebsiteDataS3,
    putWebsiteDataS3,
    getReadmeS3
}