// makes the session across the UI 
export const load = async ({ locals: { getSession } }) => {
    return {
        session: await getSession(),
    }
  }