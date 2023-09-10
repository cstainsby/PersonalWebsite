<script lang="ts">
    import ProfessionalLinkRow from "./professionalLinkRow.svelte";

    import type { ImageLink } from "$lib/websiteInterfaces";
    // import MenuToolbar from "./headerNavToolbar.svelte";
    import HeaderNavToolbar from "./headerNavToolbar.svelte";

    interface HeaderSectionProps {
        title: string
        extraDescriptor: string
        links: ImageLink[]

    }

    export let title: HeaderSectionProps["title"];
    export let extraDescriptor: HeaderSectionProps["extraDescriptor"];
    export let links: HeaderSectionProps["links"]   
    
    
    let isSignedIn = false;
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
    
        {#if isSignedIn}
            <a class="account-button" href="/auth/edit">
                <img src="media/edit.png" alt="Edit" title="Edit" height="30px" width="30px"/>
            </a>
        {:else}
            <a class="account-button" href="/auth/login">
                <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
            </a>
        {/if}
    </div>  
</div>