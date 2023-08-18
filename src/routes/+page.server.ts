import { getJsonBlobById } from '$lib/dataStore'
import type Email from '../templates/Email';
import type { PageServerLoad } from './$types';
import { fail, json } from '@sveltejs/kit';

import { sendEmailViaSES } from "$lib/aws"


/** timeout()
 *      helper function for testing interactions between frontend and backend
 */
async function timeout() {
    await new Promise(r => setTimeout(r, 2000));
}

export const load: PageServerLoad = async ({ params }) => {
    const jsonBlob = await getJsonBlobById(0);  
    return {
        jsonBlob: jsonBlob
    };
}

export const actions = {
	sendEmail: async ({ cookies, request }) => {
		const data = await request.formData();
        const email: Email = {
            fullName: String(data.get("from-name")),
            theirEmail: String(data.get("from-email")),
            theirMessage: String(data.get("message"))
        }
        let resData = {
            success: false,
            errors: []
        }
        
        try {
            const res = await sendEmailViaSES(email)
        } catch (err) {
            resData.success = false
            let resInitObj: ResponseInit = { status: 400 }
            return json(resData, resInitObj)
        }
        
        resData.success = true
        
        return json(resData, { status: 200 })
	}
};