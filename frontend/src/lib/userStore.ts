/**
 * To be used by the frontend to store user session information 
 * interacts with supabase to do so
 */

import { createClient } from '@supabase/supabase-js'
import type { Provider } from "@supabase/supabase-js";
import { writable } from "svelte/store";


const supabaseUrl = "https://jzsjdmawkxhftcewqxwj.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6c2pkbWF3a3hoZnRjZXdxeHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0OTk4MjgsImV4cCI6MjAwOTA3NTgyOH0.tG3EFtKszPulTwPMGlJp-mUMCgrl196u7CAdp_RaXyc"

export const supabaseClient = createClient(supabaseUrl, anonKey, {
    auth: {
        persistSession: false,
        detectSessionInUrl: true,
        autoRefreshToken: true
    }
})

const userStore = writable();

supabaseClient.auth.getSession().then(({ data }) => {
    userStore.set(data.session?.user);
})

supabaseClient.auth.onAuthStateChange((event, session) => {
    if(event === "SIGNED_IN" && session) {
        userStore.set(session.user)
    } else if (event === "SIGNED_OUT") {
        userStore.set(null)
    }
})

/**
 * use Oauth via supabase with a 3rd party provider to sign into application 
 * @param provider 
 */
async function signInWithProvider(provider: Provider) {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: "http://localhost:5173"
        }
    })
    console.log("login data " + data);
    // const { data, error } = supabaseClient.auth.setSession({
    //     access_token
    // }) 
}

/**
 * A simple function which finds out whether the user has been authenticated
 */
async function isAuthenticated(): Promise<boolean> {
    if (await supabaseClient.auth.getUser()) {
        return true;
    } else {
        return false;
    }
}   

function signOut() {
    supabaseClient.auth.signOut()
    userStore.set(null)
}

export {
    signInWithProvider
}
