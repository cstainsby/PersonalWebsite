import { readPageJsonById } from '$lib/dataStore'
import type { Email } from '$lib/templates/Email';
import type { PageServerLoad } from './$types';
import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions } from "./$types" 
// import { RequestHandler } from './$types';

import { sendEmailViaSES } from "$lib/aws";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

import { type Education } from '$lib/templates/Education'

export const load: PageServerLoad = async ({ params }) => {
    const jsonBlob = await readPageJsonById(0);  

    

    return {
        jsonBlob: jsonBlob
    };
}

// form actions
export const actions: Actions = {
	sendEmail: async ({ cookies, request }) => {
		const data = await request.formData();
        const email: Email = {
            fullName: data.get("from-name") as string,
            theirEmail: data.get("from-email") as string,
            theirMessage: data.get("message") as string
        }
        
        try {
            const res = await sendEmailViaSES(email)
            return { success: true }
        } catch (err) {
            console.log("Error sending Email");
        }

        return { success: false}
	},

    login: async ({ request, locals, url }) => {

        const provider = url.searchParams.get("provider") as Provider
        const body = Object.fromEntries(await request.formData())

        // const { data, error: err } = await locals.sb.auth.signInWithPassword({
        //     email: body.email as string,
        //     password: body.password as string
        // }) 

        if (provider) {
            const { data, error: err } = await locals.sb.auth.signInWithOAuth({
                provider: provider
            })

            if (err) {
                return fail(400, {
                    message: "Somthing went wrong."
                })
            }
            throw redirect(303, data.url)
        }

        // if (err) {
        //     if (err instanceof AuthApiError && err.status === 400) {
        //         return fail(400, {
        //             error: "Invalid credentials"
        //         })
        //     }
        //     return fail(500, {
        //         message: "Server error. Try again."
        //     })
        // }
        throw redirect(303, "/")
    },
};


// -----------------------------------------------------------------------
//      helper functions
// -----------------------------------------------------------------------
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

// export const main = async () => {
//   const command = new PutCommand({
//     TableName: "HappyAnimals",
//     Item: {
//       CommonName: "Shiba Inu",
//     },
//   });

//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };

 