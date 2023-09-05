
<script lang="ts">
    import LoginModal from "./modal/loginModal.svelte";
    import { isAuthenticated } from '$lib/authStore'

    let isSignedIn: boolean;
    isAuthenticated.subscribe((value) => {
        isSignedIn = value
    })

    // const { data: { user } } = await supabase.auth.getUser()
        // .then()

</script>

<style lang="scss">
    #header-nav-toolbar {
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 99999;
        background-color: var(--white);
        color: var(--darkT-black-2);

        max-width: fit-content;

        position: sticky;
        top: 32px;
        margin-bottom: 128px;
        padding: 8px;
        border-radius: 4px;
        border-style: solid;
        border-color: var(--blue);

        // all listed elements
        & > * {
            margin-top: 4px;
            margin-bottom: 4px;
        }
    }
</style>

<div id="header-nav-toolbar">
    {#if isSignedIn}
        <a class="image-link" href="/edit">
            <img src="media/edit.png" alt="Edit" title="Edit" height="30px" width="30px"/>
        </a>
    {:else}
        <a class="image-link" href="/auth">
            <img src="media/user.png" alt="Edit" title="Edit" height="30px" width="30px"/>
        </a>
    {/if}
    
    <button class="image-link">
        <img src="media/setting.png" alt="Settings" title="Settings" height="30px" width="30px"/>
    </button>
</div>