import { fail, redirect, type Actions } from "@sveltejs/kit"
import { AuthApiError, type Provider } from "@supabase/supabase-js"

export const actions: Actions = {
    login: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const provider = url.searchParams.get("provider") as Provider
        
        if (provider)  {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${url.origin}/auth/callback`
                }
            })

            if (error) {
                return fail(400, {
                    message: "Somthing went wrong"
                })
            }

            throw redirect(303, data.url)
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
                // options: {
                //     emailRedirectTo: `${url.origin}/auth/callback`,
                // },
            })

            if (error) {
                if (error instanceof AuthApiError) {
                    return fail(400, {
                        error: "Invalid credentials",
                    })
                }
                return fail(500, {
                    message: "Server error. Try again later.",
                })
            }
            throw redirect(303, "/")
        }
    },
}