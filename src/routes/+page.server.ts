import { getJsonBlobById } from '$lib/dataStore'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const jsonBlob = await getJsonBlobById(0);  
    return {
        jsonBlob: jsonBlob
    };
  }