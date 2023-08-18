import { getJsonBlobById } from '$lib/dataStore'
import type Email from '../templates/Email';
import type { PageServerLoad } from './$types';

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
        console.log(email);
        
        
        
        // sendEmailViaSES()
		// .createTodo(cookies.get('userid'), data.get('description'));
	}
};