
<script lang="ts">
    import { publicUserData } from "$lib/userStore";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import UserIconButton from "$components/UserIconButton.svelte";

    type MainTab = "Profile" | "Website" | "Employment"
    type ProfileTabSubSections = ""
    type EmploymentTabSubSections = "Resume"
    type WebsiteTabSubSections = ""

    interface TabPathInfo {
        mainTabName: string
        subTabs?: string[]
    }

    interface SelectedPathingInfo {
        mainTabSelected: string
        subsectionTabSelected?: string 
    }


    let isSignedIn = false;
    let selectedTab: MainTab = "Profile"
    let subTabText: string | null = null

    const changeTab = (newTab: MainTab) => {
        selectedTab = newTab;
    }

    function parseCurrentPath(currentHref: string): SelectedPathingInfo {
        const splitRoute = currentHref.split("/");
        const layoutRouteRootIndex = splitRoute.indexOf("personal-portal");

        let pathInfo: SelectedPathingInfo = {
            mainTabSelected: "Profile"
        }
        let mainTabRouteLabel = splitRoute[layoutRouteRootIndex + 1]
        if(mainTabRouteLabel) {
            pathInfo.mainTabSelected = mainTabRouteLabel
        }

        let subTabRouteLabel = splitRoute[layoutRouteRootIndex + 2]
        if (subTabRouteLabel) {
            pathInfo["subsectionTabSelected"] = subTabRouteLabel
        }

        return pathInfo
    }

    function onTabButtonClick(newPagePath: string, selectedTab: MainTab) {
        changeTab(selectedTab)
        goto(newPagePath)
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

        let pathInfo = parseCurrentPath(window.location.href)
        pathInfo.subsectionTabSelected 
            ? (subTabText = pathInfo.subsectionTabSelected)
            : null
        
        
        switch (pathInfo.mainTabSelected) {
            case "website": 
                selectedTab = "Website"; 
                pathInfo.subsectionTabSelected 
                    && (subTabText = pathInfo.subsectionTabSelected);
                break;
            case "employment": 
                selectedTab = "Employment"; 
                break;
            default: 
                selectedTab = "Profile"; 
                goto("/personal-portal")
                break;
        }
    })
</script>

<style lang="scss">
    .top-bar {
        height: 65px;
        display: flex;
        background-color: var(--darkT-grey-1);
        font-size: large;
        align-items: center;
        border-color: black;
        padding-left: 16px;
        padding-right: 16px;

        & > button {
            // display: flex;
            //     flex-direction: column;
            margin: 8px;
            padding: 4px;
            border-radius: 4px;

            .link-contents {
                display: flex;
                flex-direction: row;
                align-items: center;

                & > img {
                    margin-left: 8px;
                    transform: rotate(90deg)
                }
            }

            .link-text {
                display: flex;
                flex-direction: column;

                & > small {
                    margin-left: auto;
                }
            }
        }
        & > button:hover {
            background-color: grey;
        }
    }

    .selected-tab {
        background-color: var(--blue);
    }

    .user-button-container {
        margin-left: auto;
    }
</style>

<div id="portal-layout">
    <div class="top-bar">
        <a 
            href="/">
            Back
        </a>
        <button 
            class:selected-tab={selectedTab === "Profile"}
            on:click={() => onTabButtonClick("/personal-portal/", "Profile")}>
            Profile
        </button>
        <button 
            class:selected-tab={selectedTab === "Website"}
            on:click={() => onTabButtonClick("/personal-portal/website", "Website")}>
            Website
        </button>
        <button 
            class:selected-tab={selectedTab === "Employment"}
            on:click={() => onTabButtonClick("/personal-portal/employment", "Employment")}>
            <div class="link-contents">
                <div class="link-text">
                    <large>Employment</large>
                    {#if subTabText && selectedTab === "Employment"} 
                        <small>/{subTabText}</small>
                    {/if}
                </div>
                <img src="../../media/arrow.png" alt="dropdown" height="10px" width="10px"/>
            </div>
        </button>

        <div class="user-button-container">
            <UserIconButton/>
        </div>
    </div>

    <slot/>
</div>