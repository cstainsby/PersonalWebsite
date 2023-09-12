
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
        // if (!isSignedIn) {
        //     goto("/auth/login")
        // } 

        // set the currently selected tab
        const splitRoute = window.location.href.split("/");
        const layoutRouteRootIndex = splitRoute.indexOf("personal-portal");
        console.log(splitRoute[splitRoute.length - 1]);
        // no extra directions after route? default to profile 
        if(layoutRouteRootIndex === splitRoute.length - 1) {
            selectedTab = "Profile"
        } 
        let extraSubRouteLabel = splitRoute[splitRoute.length - 1]
        switch (extraSubRouteLabel) {
            case "website": selectedTab = "Website"; break;
            case "employment": selectedTab = "Employment"; break;
            default: 
                selectedTab = "Profile"; 
                goto("/personal-portal")
                break;
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