import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readReadmeFromLocal } from '$lib/localDataAccess';
import { getReadmeS3 } from '$lib/aws';

export async function GET({ url }) {
    const projectName = String(url.searchParams.get("projectName") ?? "");
    
    if (projectName === "") {
        throw error(400, "No Project name passed")
    }

    // getReadmeS3()
    
    try {
        const fileContent = await readReadmeFromLocal(projectName)
        const cleanFileContent = cleanLocallyReadReadme(fileContent);
    
        return new Response(btoa(cleanFileContent))
    } catch (err) {
        throw error(500, "Issue Reading file")
    }
}


// ----------------------------------------------------------------
//      helper functions
// ----------------------------------------------------------------

/**
 * parses and cleans locally stored readme's
 * @param rawReadmeContent  
 */
function cleanLocallyReadReadme(rawReadmeContent: string): string {
    const cleanContent: string = rawReadmeContent
        .replace(/\n/g, "\n")
        .replaceAll("\"", " ")

    return cleanContent;
}