
import { LOCAL_DATA_DIR } from '$env/static/private'
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
 * read page data from local storageS
 * @param userId 
 * @returns 
 */
async function readPageJsonById(userId: number) {
    const jsonDataPath = `${LOCAL_DATA_DIR}/sampleInfoJson.json`
    
    return await fetch(`${jsonDataPath}`)
        .then(fullBlobSet => fullBlobSet.json())
        .then(jsonBlob => jsonBlob[userId])
        .catch(err => {
            throw err
        })
}

/**
 * read a local project readme from local storage
 * @param projectName 
 * @returns Promise for text content
 */
async function readReadmeFromLocal(projectName: string): Promise<string> {
    const filePath = `${LOCAL_DATA_DIR}/readme/${projectName}/README.md`;

    return await fetch(`${filePath}`)
        .then(readmeFileRes => readmeFileRes.text())
        .catch(err => {
            throw err
        })
}

export {
    readPageJsonById,
    readReadmeFromLocal,
    signInWithProvider
}