
<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { signInWithProvider } from "$lib/userStore";

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
    #header-nav-toolbar {
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        z-index: 99999;
        background-color: var(--white);
        color: var(--darkT-black-2);

        max-width: fit-content;

        position: sticky;
        top: 32px;
        margin-bottom: 128px;
        padding: 8px;
        border-radius: 4px;

        button {
            margin-left: 8px;
            margin-right: 8px;
        }
    }
</style>

<div id="header-nav-toolbar">
    <!-- <form method="POST" use:enhance={submitSocialLogin}>
        <button formaction="?/login&provider=github">Github</button>
    </form> -->
    {#if isSignedIn}
        <!-- <button class="image-link">
            <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
        </button> -->
    {:else}
        <form method="POST" use:enhance={submitSocialLogin}>
            <button class="image-link">
                <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
            </button>
        </form>
    {/if}

    {#if isSignedIn} 
        <button class="image-link">
            <img src="media/edit.png" alt="Edit" title="Edit" height="30px" width="30px"/>
        </button>
    {/if}
    
    <button class="image-link">
        <img src="media/setting.png" alt="Settings" title="Settings" height="30px" width="30px"/>
    </button>
</div>