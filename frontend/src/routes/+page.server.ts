import { readPageJsonById } from '$lib/dataStore'
import type { Email } from '$lib/templates/Email';
import type { PageServerLoad } from './$types';
import { fail, json } from '@sveltejs/kit';
// import { RequestHandler } from './$types';

import { sendEmailViaSES } from "$lib/aws";

import { type Education } from '$lib/templates/Education'

export const load: PageServerLoad = async ({ params }) => {
    const jsonBlob = await readPageJsonById(0);  

    

    return {
        jsonBlob: jsonBlob
    };
}

// form actions
export const actions = {
	sendEmail: async ({ cookies, request }) => {
		const data = await request.formData();
        const email: Email = {
            fullName: String(data.get("from-name")),
            theirEmail: String(data.get("from-email")),
            theirMessage: String(data.get("message"))
        }
        
        try {
            const res = await sendEmailViaSES(email)
            return { success: true }
        } catch (err) {
            console.log("Error sending Email");
        }

        return { success: false}
	}
};