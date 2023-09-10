
<script lang="ts">
    import DataSelectorSidebar from "./dataSelectorSidebar.svelte";

    // import { isAuthenticated } from '$lib/userStore'

    let isSignedIn: boolean;
    // isAuthenticated.subscribe((value) => {
    //     isSignedIn = value
    // })
</script>

<style lang="scss">
    #edit-layout {
        display: flex;
        flex-direction: row;
    }
</style>

<div id="edit-layout">
    <a href="/">Back</a>
    {#if isSignedIn}
        <slot/>
    {:else}

    {/if}
</div>