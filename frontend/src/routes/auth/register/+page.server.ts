import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

		const { data, error } = await locals.supabase.auth.signUp({
			email: email,
			password: password
            
		})

        console.log("returned data " + JSON.stringify(data));
        console.log("error " + error);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: "Invalid email or password",
				})
			}
			return fail(500, {
				error: "Server error. Please try again later.",
			})
		} else {
            return data
        }
	},
}