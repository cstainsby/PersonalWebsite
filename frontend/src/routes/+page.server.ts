import type { Email } from '$lib/templates/Email';
import type { PageServerLoad } from './$types';
import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions } from "./$types" 

import { sendEmailViaSES, getWebsiteDataS3, getDataRouteS3 } from "$lib/aws";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

import { page } from '$app/stores';  


export const load: PageServerLoad = async ({ locals: { supabase, getSession }}) => {
    let s3WebsiteDataStorePath = ""
    let s3SiteSpecificDataPath = ""

    // get page data on load
    page.subscribe(pageData => {
        const pageHostname = pageData.url.hostname
        getDataRouteS3("colestainsby.com")
            .then(dataRoute => {s3SiteSpecificDataPath = dataRoute})
            .then(() => console.log(s3SiteSpecificDataPath))
    })

    // s3SiteSpecificDataPath = await getDataRouteS3("colestainsby.com")

    
    const jsonBlob = await getWebsiteDataS3(s3SiteSpecificDataPath + "/site-data.json")

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

 