import type { LayoutServerLoad } from "./$types"

/**
 * Passes session to the rest of our layout 
 * Makes sure this session is availible in each pages page data
 * @param eventSession 
 * @returns 
 */
export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    return {
        session: await getSession(),
    }
  }