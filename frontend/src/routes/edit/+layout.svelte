
<script lang="ts">
    import DataSelectorSidebar from "./dataSelectorSidebar.svelte";
    import { publicUserData } from "$lib/userStore";
    import { redirect } from "@sveltejs/kit";

    let isSignedIn = false;
    publicUserData.subscribe(value => {
        if (value) {
            isSignedIn = true
        }
    });

    // redirect user to the login page if the user isn't signed in
    if (!isSignedIn) {
        throw redirect(300, "/auth/login")
    } 
</script>

<style lang="scss">
    #edit-layout {
        display: flex;
        flex-direction: row;
    }
</style>

<div id="edit-layout">
    <a href="/">Back</a>
    <slot/>
</div>