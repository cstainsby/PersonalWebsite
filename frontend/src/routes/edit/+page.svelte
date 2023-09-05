
<script lang="ts">
    import { onMount } from 'svelte';
    import { JSONEditor } from 'svelte-jsoneditor'

    import type { PageServerData } from './$types';
    import type { WebsiteData } from "$lib/templates/WebsiteData";
    import type { Education } from "$lib/templates/Education"
    import type { Job } from "$lib/templates/Job"
    import type { Project } from "$lib/templates/Project"
    import type { Skill } from "$lib/templates/Skill"


    export let data: PageServerData;
    const websiteData: WebsiteData = data.jsonBlob;

    type DisplayableData = WebsiteData | Project[] | Skill[] | Job[] | Education[];
    let displayData: DisplayableData = websiteData;

    type DisplayType = "json" | "html"
    const selectedDisplayTypeLocalStorageKey = "selectedEditDisplayType"
    let selectedDisplayType: DisplayType = "html"

    type DataFilterType = "all" | "personal" | "website" | "projects" | "skills" | "jobs" | "education"
    const selectedDataFilterLocalStorageKey = "selectedDataFilter"
    let selectedDataFilter: DataFilterType = "all"

    onMount(() => {
        // set display type from local storage
        const storedDisplayType = localStorage.getItem(selectedDisplayTypeLocalStorageKey) as DisplayType
        if (storedDisplayType !== null) {
            selectedDisplayType = storedDisplayType;
        }

        // set data filter from local storage
        const storedDataFilter = localStorage.getItem(selectedDataFilterLocalStorageKey) as DataFilterType
        if (storedDataFilter !== null) {
            selectedDataFilter = storedDataFilter;
        }
    })

    const onDisplayTypeButtonClick = (displayType: DisplayType) => {
        selectedDisplayType = displayType
        localStorage.setItem(selectedDisplayTypeLocalStorageKey, displayType)
    }

    const onDataFilterButtonClick = (filterBy: DataFilterType) => {
        selectedDataFilter = filterBy;
        localStorage.setItem(selectedDataFilterLocalStorageKey, filterBy)
        console.log("filtering by " + filterBy);
        
        const filteredData = getDataByFilterForDisplay(filterBy)
        console.log(filteredData);
        

        displayData = filteredData
    }

    function getDataByFilterForDisplay(filterBy: DataFilterType): DisplayableData {
        let selectedData;
        switch(filterBy) {
            case "all":
                selectedData = websiteData
                break;

            // case "personal":
            //     selectedData = {
            //         personalBlurbs: websiteData.personalBlurbs,
            //         professionalLinks: websiteData.professionalLinks
            //     }
            //     break;
            // case "website":
            //     selectedData = {
            //         title: websiteData.title,
            //         settings: websiteData.settings
            //     }
            //     break;
            case "projects":
                selectedData = websiteData.projects
                break;
            case "skills":
                selectedData = websiteData.skills
                break;
            case "jobs":
                selectedData = websiteData.jobs
                break;
            case "education":
                selectedData = websiteData.education
                break
            default:
                selectedData = websiteData
                break;
        }
        return selectedData;
    }

    function displayableDataToEditorContentString(displayableData: DisplayableData) {
        return { text: JSON.stringify(displayableData, null, 4) }
    }
</script>

<style lang="scss">
    #editor-page {
        width: 90%
    }
    #json-text-area {
        width: 50%;
        height: auto;
    }
    #display-type-selector {
        display: flex;
        flex-direction: row;
        margin-left: 16px;

        & > hr {
            border-left: 1px solid #000;height:16px;
            margin-left: 2px;
            margin-right: 2px;
        }
        & > button {
            margin: 2px;
            padding: 2px;

        }
        & > button:hover {
            background-color: grey;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > #save-button {
            margin-left: auto;
        }
    }
    .content {
        display: flex;
        flex-direction: row;

        & > #data-selector {
            display: flex;
            flex-direction: column;
            margin: 8px;

            & > button {
                text-align: left;
                margin: 8px;
            }
        }

        & > form {
            width: inherit
        }
    }
</style>

<div id="editor-page">
    <div class="header">
        <h1>Edit Your Website</h1>

        <div id="display-type-selector">
            <button on:click={() => onDisplayTypeButtonClick("html")}>HTML</button>
            <hr/>
            <button on:click={() => onDisplayTypeButtonClick("json")}>JSON</button>
        </div>
    </div>

    <div class="content">
        <div id="data-selector">
            <button on:click={() => onDataFilterButtonClick("all")}>All</button>
            <button on:click={() => onDataFilterButtonClick("projects")}>Projects</button>
            <button on:click={() => onDataFilterButtonClick("skills")}>Skills</button>
            <button on:click={() => onDataFilterButtonClick("jobs")}>Jobs</button>
            <button on:click={() => onDataFilterButtonClick("education")}>Education</button>
        </div>
        <form>
            {#if selectedDisplayType === "json"}
                <!-- <textarea id="json-text-area">
                    
                </textarea> -->
                <JSONEditor content={displayableDataToEditorContentString(displayData)}/>
            {:else}
            {/if}
        </form>
    </div>
</div>