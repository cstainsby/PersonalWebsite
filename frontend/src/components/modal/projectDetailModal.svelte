
<script lang="ts">
    import type { GithubInfo } from "$lib/templates/Project";
    import snarkdown from "snarkdown"
    import Spinner from "../Spinner.svelte";
    import { timeout } from "$lib/frontendUtil";


    interface ProjectDetailModalProps {
        buttonText: string
        projectName: string 

        // readme can either use a string to point to a location on 
        readmeSrc: "local" | "github"

        githubProjectInfo?: GithubInfo
    }

    export let buttonText: ProjectDetailModalProps["buttonText"];
    export let projectName: ProjectDetailModalProps["projectName"];
    export let readmeSrc: ProjectDetailModalProps["readmeSrc"];
    export let githubProjectInfo: ProjectDetailModalProps["githubProjectInfo"];
  
    let showDialog: boolean = false;
    let isLoadingReadme: boolean = true;

    let readmeContent: string = "" 

    // constants 
    const githubApiPrefix = "https://api.github.com/repos/"


    // Function to enable scrolling
    function enablePageScroll() {
        const root = document.querySelector('html')
        if (root) {
            root.classList.remove('no-scroll');
        }
    }

    // Function to disable scrolling
    function disablePageScroll() {
        const root = document.querySelector('html')
        if (root) {
            root.classList.add('no-scroll');
        }
    }

    /**
     * Gets a readme from the json blob if it exists
     */
    async function getReadmeFromLocal(projectName: string): Promise<string> {
        const res: string = await fetch(`/readme?projectName=${projectName}`)
            .then(data => data.text());
        
        if (!res) {
            return ""
        } else {
            return res
        }
    }

    /**
     * Gets a readme fro the github api based on repository information
     * @param repoOwner
     * @param repoName
     * @param pathToReadme
     */
    async function getReadmeFromGithubApi(repoOwner: string, repoName: string, pathToReadme: string): Promise<string> {
        const abortController = new AbortController()

        const timeoutId = setTimeout(() => abortController.abort(), 5000)


        const res: string | void = await fetch(githubApiPrefix + `${repoOwner}/${repoName}/contents/${pathToReadme}`, { signal: abortController.signal})
            .then(res => res.json())
            .then(data => {
                const readmeContentFromGithub = atob(data.content)
                return readmeContentFromGithub 
            })
            .catch(err => console.log(err));
        if (!res) {
            return `
            # Readme Couldn't Be Located\n\n

            There was an issue finding your readme at ${githubApiPrefix}**${repoOwner}**/**${repoName}**/contents/**${pathToReadme}**

                
            `
        } else {
            return res
        }
    }

    /**
     * Adds any needed custom formating to a readme necessary for it to render as expected
     * @param repoOwner
     * @param repoName
     * @param readme
     */
    function formatGithubReadmeString(repoOwner: string, repoName: string, readme: string) {
        const readmeProcessed = snarkdown(readme)

        // get images in readme are likely relative so I will add a prefix to get the images 
        //  for this I will use the DOM to make life a bit simpler
        const htmlStringContainer = document.createElement('div')
        htmlStringContainer.innerHTML = readmeProcessed;

        const imgElements = htmlStringContainer.querySelectorAll('img');

        imgElements.forEach((element) => {
            const currentSrc = element.getAttribute('src');
            // ensure the img src exists and is relative
            if (currentSrc && (currentSrc.length > 8 && currentSrc.slice(0, 8) != "https://")) {
                const newSrc = githubApiPrefix + `${repoOwner}/${repoName}/contents/` + currentSrc;

                fetch(newSrc)
                    .then(res => res.json())
                    .then(data => {
                        const body = atob(data.body)
                    })
            }
        })

        const modifiedHtmlString = htmlStringContainer.innerHTML;
        return modifiedHtmlString;
    }
  
    const openDialog = () => {
        showDialog = true;
        isLoadingReadme = true;
        disablePageScroll()

        if (readmeSrc === "local") {
            getReadmeFromLocal(projectName)
                .then(rawContent => {
                    const correctedContent = atob(rawContent)
                    readmeContent = correctedContent;
                })
                .then(() => { 
                    timeout(0.1).then(() => {
                        isLoadingReadme = false
                    })
                })
        } else if (readmeSrc === "github"  && githubProjectInfo !== undefined) {
            const repoOwner = githubProjectInfo.repoOwner
            const repoName = githubProjectInfo.repoName
            
            getReadmeFromGithubApi(repoOwner, repoName, "README.md")
                .then(rawContent => {
                    const correctedContent = formatGithubReadmeString(repoOwner, repoName, rawContent);
                    readmeContent = correctedContent;
                })
                .then(() => { 
                    timeout(0.3).then(() => {
                        isLoadingReadme = false
                    })
                })
        }
    };
    const closeDialog = () => {
        showDialog = false;
        enablePageScroll()
    };
</script>
  

<style lang="scss">
    .modal-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent gray overlay */
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .dialog {
		width: 65%;
        height: 80%;
        padding: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        border-radius: 4px; 
		border: none;
        // background-color: white;
        color: var(--white);
        z-index: 99999;
        overflow-y: auto;
        background-color: var(--darkT-grey-1);
	}

    .dialog-header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        & > button {
            margin-left: auto;
            margin-right: 8px;
        }
    }

    .dialog-body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<!-- <zero-md src></zero-md> -->
<button class="word-link" on:click={openDialog}>{ buttonText }</button>
{#if showDialog === true}
    <div class="modal-overlay">
        <div class="dialog">
            <div class="dialog-header">
                <h1>Details</h1>
                <button on:click={closeDialog}>
                    <img src="media/close.png" alt="Close" height="20">
                </button>
            </div>
            <hr/>
            <div class="dialog-body">
                {#if isLoadingReadme}
                    <Spinner/>
                {:else}
                    <!-- Show readmeContent when not loading -->
                    <div>{@html snarkdown(readmeContent)}</div>
                {/if}
            </div>
        </div>
    </div>
{/if}