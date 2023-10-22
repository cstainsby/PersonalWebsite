<script lang="ts">
    import JobHuntSection from "./JobHuntSection.svelte";
    import CurrentEmploymentSection from "./CurrentEmploymentSection.svelte";
    import PastEmploymentSection from "./PastEmploymentSection.svelte";
    import DocumentsSection from "./DocumentsSection.svelte";

    import type { Job as JobType } from "$lib/templates/Job"
    import Job from "$components/Job.svelte"
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import SectionError from "$components/Section_Error.svelte";

    let currentlySelectedPage: "ApplicationPage" | "ResumePage" | "CoverLetterPage" | "OverviewPage" = "OverviewPage"

    /**
     * Changes the current url parameter which indicates the current tab selected
     */
    function changeTabUrlParam() {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('tab', currentlySelectedPage)
        goto(currentUrl.toString())
    }

    /**
     * Event handler for a button click which changes the tab
     * @param event
     */
    function onPageSelectChange(event: Event) {
        if (event === null 
            || event.currentTarget === null) { return }
        
        const target = event.currentTarget as HTMLButtonElement
        
        switch (target.value) {
            case "OverviewPage":
                currentlySelectedPage = "OverviewPage"
                break;
            case "ApplicationPage":
                currentlySelectedPage = "ApplicationPage"
                break;
            case "ResumePage":
                currentlySelectedPage = "ResumePage"
                break;
            case "CoverLetterPage":
                currentlySelectedPage = "CoverLetterPage"
                break;
            default:
                console.error("Un-covered tab option returned from tab switch button. Value: " + currentlySelectedPage)
                break;
        }
	}
</script>

<style lang="scss">
    
    .tablist {
        list-style-type: none;

        & > li {
            display: inline-block;

            & > button {
                min-width: 100px;
            }
        }
    }
    
    .active-page-btn {
        background-color: var(--blue);
    }
</style>


<div id="employment-page">
    <div>
        <ul class="tablist">
            <li>
                <button 
                    class:active-page-btn={currentlySelectedPage==="OverviewPage"} 
                    on:click={onPageSelectChange}
                    value="OverviewPage">
                    Overview
                </button> 
            </li>
            <li>
                <button 
                    class:active-page-btn={currentlySelectedPage==="ApplicationPage"} 
                    on:click={onPageSelectChange}
                    value="ApplicationPage">
                    Applications
                </button> 
            </li>
            <li>
                <button 
                    class:active-page-btn={currentlySelectedPage==="CoverLetterPage"} 
                    on:click={onPageSelectChange}
                    value="CoverLetterPage">
                    Cover Letter
                </button> 
            </li>
            <li>
                <button 
                    class:active-page-btn={currentlySelectedPage==="ResumePage"} 
                    on:click={onPageSelectChange}
                    value="ResumePage">
                    Resume
                </button> 
            </li>
        </ul>
        
    </div>

    {#if currentlySelectedPage === "OverviewPage"}

    <!-- {:else if}

    {:else if} -->

    {:else}
        <SectionError/>
    {/if}
</div>