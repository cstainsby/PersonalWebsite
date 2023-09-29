import { readPageJsonById } from '$lib/dataStore'
import type { Email } from '$lib/templates/Email';
import type { PageServerLoad } from './$types';
import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions } from "./$types" 
// import { RequestHandler } from './$types';

import { sendEmailViaSES } from "$lib/aws";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

import { type Education } from '$lib/templates/Education'
import { getWebsiteData } from '$lib/dynamoDB';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {

    

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

    // login: async ({ request, url, locals: { supabase } }) => {
    //     const formData = await request.formData()
    //     const email = formData.get('email') as string
    //     const password = formData.get('password') as string
    
    //     const { error } = await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             emailRedirectTo: `${url.origin}/auth/callback`,
    //         },
    //     })
    
    //     if (error) {
    //         return fail(500, { message: 'Server error. Try again later.', success: false, email })
    //     }
    
    //     return {
    //         message: 'Please check your email for a magic link to log into the website.',
    //         success: true,
    //     }
    // },
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

 