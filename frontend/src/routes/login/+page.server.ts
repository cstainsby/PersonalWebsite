import { fail, type Actions } from "@sveltejs/kit"

export const actions: Actions = {
    login: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
    
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            // options: {
            //   emailRedirectTo: `${url.origin}/auth/callback`,
            // },
        })
    
        if (error) {
            return fail(500, { message: 'Server error. Try again later.', success: false, email })
        }
        console.log("data " + data)
        return {
            message: 'Please check your email for a magic link to log into the website.',
            success: true,
        }
    },
}