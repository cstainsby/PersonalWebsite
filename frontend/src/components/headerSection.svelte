<script lang="ts">
    import ProfessionalLinkRow from "./professionalLinkRow.svelte";

    import type { ImageLink } from "$lib/templates/ImageLink";
    // import MenuToolbar from "./headerNavToolbar.svelte";
    import { publicUserData } from "$lib/userStore";

    interface HeaderSectionProps {
        title: string
        extraDescriptor: string
        links: ImageLink[]

    }

    export let title: HeaderSectionProps["title"];
    export let extraDescriptor: HeaderSectionProps["extraDescriptor"];
    export let links: HeaderSectionProps["links"]   

    let accountDropdownLabel: string = "";
    let accountDropdownToggle: boolean = false;
    
    let isSignedIn = false;
    publicUserData.subscribe(data => {
        if (data && data.authenticated) {
            isSignedIn = true

            if (data.name && data.name.length > 0) {
                accountDropdownLabel = data.name[0].toUpperCase()
            } 
        } else {
            isSignedIn = false;
            accountDropdownLabel = "";
        }
    })


    function onSignOutButtonClick() {
        fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if required (e.g., authorization token)
        },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            publicUserData.set(null)
        })
        .then(data => {
            // Handle successful response (if any)
            console.log('Logged out successfully', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error logging out:', error);
        })
        .finally(() => {
            accountDropdownToggle = false;
        });
    }
</script>

<style lang="scss">
    #greeting-section {
        height: 100svh;
        width: 100vw;
        background-color: var(--darkT-black-1);
        z-index: var(--zind-foreground);

        #greeting-section-background-imgs {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: var(--zind-background);

            & #mountain-png {
                position: absolute;
                width: 100%;
                height: 50%;
                bottom: 0px;
                left: 0px;

                max-height: 30%;
            }

            & #side-cloud-png {
                position: absolute;
                width: 25%;
                height: auto;
                top: 200px;
                right: 0px;
            }

            & #planet-png {
                position: absolute;
                width: 10%;
                height: auto;
                top: 50px;
                right: 15%;
            }

            & #middle-cloud-png {
                position: absolute;
                width: 20%;
                height: auto;
                top: 200px;
                right: 30%;

                @media (max-width: 1000px) {
                visibility: hidden;
                }
            }
        }


        .section-content {
            height: 100%;
            display: flex;
            flex-direction: row;
            padding: 32px;
            z-index: var(--zind-foreground);

            #intro-content-block {
                margin-right: auto;
            }

            & .section-title {
                margin-top: 12px;
                font-size: 64px;
                text-align: left;
            }

            // & .section-body {
            //     ;
            // }

            & #navigation-links {
                display: flex;
                flex-wrap: wrap;
                & a {
                    z-index: var(--zind-foreground);
                }
            }
        }
    }

    .account-button {
        height: 45px;
        width: 45px;
        z-index: 99999;
        background-color: var(--white);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
    }

    .dropdown {
        display: flex;
        flex-direction: column;
        background-color: var(--darkT-grey-1);
        border-radius: 4px;
        padding: 4px;
        margin-top: 4px;
        width: 128px;

        & > a, button {
            padding: 8px;
            border-radius: 4px;
            text-align: start;
        }
        & > a:hover {
            background-color: grey;
        }
        & > button:hover {
            background-color: grey;
        }
    }

    .dropdown-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        position: sticky;
        top: 32px;
        margin-bottom: 64px;
        z-index: 99999;
        
        height: fit-content;

        // & > .background {
        //     height: 100vh;
        //     width: 100vw;
        //     position: absolute;
        //     top: 0;
        //     z-index: 2;
        // }
    }
</style>


    <!-- greeting section -->
<div id="greeting-section">
    <!-- static imgs used in decorating the header section -->
    <div id="greeting-section-background-imgs">
        <img id="planet-png" alt="planet" src="media/planet.png">
        <img id="side-cloud-png" alt="cloud" src="media/cloud.png">
        <img id="mountain-png" alt="mountain" src="media/mountain.png">
        <img id="middle-cloud-png" alt="cloud" src="media/middlecloud.png">
    </div>

    <div class="section-content">
        <div id="intro-content-block">
            <div class="title">
                {#each title.split('\n') as titleLine}
                    <div class="section-title">{titleLine}</div>
                {/each}
            </div>
            <ProfessionalLinkRow imageLinks={links}/>
        
            <div class="section-body">
                {#each extraDescriptor.split('\n') as desLine}
                    <p>{desLine}</p>
                {/each}
            </div>
        
            <div id="navigation-links">
                <a class="word-link" href="#projects-section">
                    <b>Projects</b>
                </a>
                <a class="word-link" href="#about-me-section">
                    <b>About Me</b>
                </a>
                <a class="word-link" href="#skills-section">
                    <b>Skills</b>
                </a>
                <a class="word-link" href="#contact-section">
                    <b>Contact Me</b>
                </a>
            </div>
        </div>
        
        <div class="dropdown-container">
            <!-- <div class="background"></div> -->
            {#if isSignedIn}
                <button class="account-button" on:click={() => { accountDropdownToggle = !accountDropdownToggle }}>
                    <h2>{accountDropdownLabel}</h2>
                </button>
            {:else}
                <a class="account-button" href="/auth/login">
                    <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
                </a>
            {/if}

            {#if accountDropdownToggle} 
            <div class="dropdown">
                <a href="/personal-portal">Profile</a>
                <a href="/personal-portal/website">Website</a>
                <a href="/personal-portal/employment">Employment</a>
                <div style="width: 80%; align-self:center;"><hr/></div>
                <button on:click={onSignOutButtonClick}>Sign Out</button>
            </div>
            {/if}
        </div>
    </div>  
</div>