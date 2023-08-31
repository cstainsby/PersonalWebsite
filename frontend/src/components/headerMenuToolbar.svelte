
<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { signInWithProvider } from "$lib/dataStore";

    let isSignedIn = false;

    const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
        switch (action.searchParams.get('provider')) {
            case "github":
                await signInWithProvider("github")
                break;
            default:
                break;
        } 
        cancel();
    }

</script>

<style lang="scss">
    #menu-toolbar {
        display: flex;
        flex-direction: row;
        z-index: 99999;
    }
</style>

<div id="menu-toolbar">
    <form method="POST" use:enhance={submitSocialLogin}>
        <button formaction="?/login&provider=github">Github</button>
    </form>
    
    <div id="settings-dropdown">

    </div>
</div>