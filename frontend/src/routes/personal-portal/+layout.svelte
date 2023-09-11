
<script lang="ts">
    import { publicUserData } from "$lib/userStore";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    type Tab = "Profile" | "Website" | "Employment"

    let isSignedIn = false;
    let selectedTab: Tab = "Profile"

    const changeTab = (newTab: Tab) => {
        selectedTab = newTab;
    }

    onMount(() => {
        publicUserData.subscribe(value => {
            if (value) {
                isSignedIn = true
            }
        });
        // redirect user to the login page if the user isn't signed in
        if (!isSignedIn) {
            goto("/auth/login")
        } 
    })
</script>

<style lang="scss">
    .top-bar {
        width: fit-content;
        background-color: var(--darkT-grey-2);
        margin: 8px;
        font-size: large;
        border-radius: 4px;

        & > a {
            margin: 8px;
            padding: 4px;
            border-radius: 4px;
        }
        & > a:hover {
            background-color: grey;
        }
    }

    .selected-tab {
        background-color: var(--blue);
    }
</style>

<div id="portal-layout">
    <div class="top-bar">
        <a href="/">Back</a>
        <a 
            href="/personal-portal/"
            class:selected-tab={selectedTab === "Profile"}
            on:click={() => changeTab("Profile")}>Profile</a>
        <a 
            href="/personal-portal/website" 
            class:selected-tab={selectedTab === "Website"}
            on:click={() => changeTab("Website")}>Website</a>
        <a 
            href="/personal-portal/employment" 
            class:selected-tab={selectedTab === "Employment"}
            on:click={() => changeTab("Employment")}>Employment</a>
    </div>

    <slot/>
</div>