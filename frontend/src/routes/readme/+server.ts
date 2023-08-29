import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readReadmeFromLocal } from '$lib/dataStore';

export async function GET({ url }) {
    const projectName = String(url.searchParams.get("projectName") ?? "");
    
    if (projectName === "") {
        throw error(400, "No Project name passed")
    }
    
    try {
        const fileContent = await readReadmeFromLocal(projectName)
        return json(fileContent)
    } catch (err) {
        throw error(500, "Issue Reading file")
    }
}