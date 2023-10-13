import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readReadmeFromLocal } from '$lib/localDataAccess';
import { getReadmeS3, getDataRouteS3 } from '$lib/aws';

export async function GET({ url }) {
    const projectName = String(url.searchParams.get("projectName") ?? "");
    // const hostname = url.hostname
    let hostname = "colestainsby.com"
    
    if (projectName === "") {
        throw error(400, "No Project name passed")
    }

    if(hostname === "localhost") {
        try {
            const fileContent = await readReadmeFromLocal(projectName)
            const cleanFileContent = cleanLocallyReadReadme(fileContent);
        
            return new Response(btoa(cleanFileContent))
        } catch (err) {
            throw error(500, "Issue Reading file")
        }
    } else {
        const s3WebsiteDirectoryObj = await getDataRouteS3(hostname);
        const siteDataPath = s3WebsiteDirectoryObj["s3StoreKey"] + "/"
            + "READMEs/"
            + "project_" + projectName + ".md" 
        console.log("site Data path " + siteDataPath);
        
        const readme = await getReadmeS3(siteDataPath)

        return new Response(btoa(readme))
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