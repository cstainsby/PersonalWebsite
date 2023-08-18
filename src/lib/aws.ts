import { SESV2 } from "aws-sdk";
import type Email from "../templates/Email";
import { SendEmailCommand, 
    type SendEmailCommandInput,
    type SendEmailCommandOutput,
    SESClient } from "@aws-sdk/client-ses"


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
        const client = new SESClient();
        const res: SendEmailCommandOutput = await client.send(sendCmd);
        return res;
    } catch (e) {
        console.log("Failed to send Email");
        throw e
    }
    
}

export {
    sendEmailViaSES
}