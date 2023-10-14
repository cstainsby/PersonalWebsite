
<script lang="ts">
    import type { GithubInfo } from "$lib/templates/Project";
    import snarkdown from "snarkdown"
    import Spinner from "../Spinner.svelte";
    import { timeout } from "$lib/frontendUtil";
    import GenericModal from "./genericModal.svelte";


    interface ProjectDetailModalProps {
        buttonText: string
        projectName: string 

        // readme can either use a string to point to a location on 
        readmeSrc: "local" | "github"

        githubProjectInfo?: GithubInfo
    }

    // export let buttonText: ProjectDetailModalProps["buttonText"];
    export let projectName: ProjectDetailModalProps["projectName"];
    export let readmeSrc: ProjectDetailModalProps["readmeSrc"];
    export let githubProjectInfo: ProjectDetailModalProps["githubProjectInfo"];
  
    let showDialog: boolean = false;

    let readmeContent: string = "" 

    // constants 
    const githubApiPrefix = "https://api.github.com/repos/"

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

    /**
     * Get specific data needed for this modal, inject it into the generic modal on Open
     */
    const onOpen = async () => {
        if (readmeSrc === "local") {
            let rawContent = await getReadmeFromLocal(projectName);

            const correctedContent = atob(rawContent);
            readmeContent = correctedContent;

        } else if (readmeSrc === "github"  && githubProjectInfo !== undefined) {
            const repoOwner = githubProjectInfo.repoOwner
            const repoName = githubProjectInfo.repoName
            
            let rawContent = await getReadmeFromGithubApi(repoOwner, repoName, "README.md");
            const correctedContent = formatGithubReadmeString(repoOwner, repoName, rawContent);
            readmeContent = correctedContent;
        }
    }

    const onClose = async () => {}
</script>

<GenericModal {onOpen} {onClose}>
    <span slot="title">Details</span>
    <button slot="open-clickable-element" class="word-link">
        Details
    </button>
    <div slot="content">{@html snarkdown(readmeContent)}</div>
</GenericModal>