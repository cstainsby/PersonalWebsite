
<script lang="ts">
    import snarkdown from "snarkdown"
    import Spinner from "../Spinner.svelte";
    import { timeout } from "$lib/frontendUtil";



    interface ModalProps {
        buttonText: String
    }

    export let buttonText: ModalProps["buttonText"];
  
    let showDialog: boolean = false;
    let isLoadingReadme: boolean = true;

    let readmeContent: string = "" 


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

    async function getReadmeByGithubApi(repoOwner: string, repoName: string, pathToReadme: string): Promise<string> {
        const res: string | void = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pathToReadme}`)
            .then(res => res.json())
            .then(data => {
                const readmeContent = atob(data.content)
                return readmeContent 
            })
            .catch(err => console.log(err));

        if (!res) {
            return ""
        } else {
            return res
        }
    }
  
    const openDialog = () => {
        showDialog = true;
        isLoadingReadme = true;
        disablePageScroll()

        // set content for modal on component mount
        getReadmeByGithubApi("cstainsby", "B-Onion", "README.md")
            .then(content => {
                readmeContent = content
            })
            .then(() => { 
                timeout(0.3).then(() => {
                    isLoadingReadme = false
                })
            })
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
        background-color: white;
        color: black;
        z-index: 99999;
        overflow-y: auto;

	}

    .dialog-header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        & > button {
            margin-left: auto;
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
                <button class="word-link" on:click={closeDialog}>X</button>
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

  
<dialog id="BioPathprojModal" class="modal">
    <div class="proj-dialog-header">
        <h1>BioPath</h1>
        <a class="close-modal-button image-link">
        <img src="media/close.png" height="20">
        </a>
    </div>
    <hr>
    <div class="proj-dialog-body">
        <div class="dialog-body-text">
        <h3 class="dialog-body-section-header">About The Project</h3>
        <p>
            My small team partnered with the GU Biochemistry department to create a web app which aids students in learning Biochemical pathways. 
            To achieve this, we built an interactive graph based tool to model the complex interactions of a biochemical pathway in a simplified manner.
            Our tool would allow the student to build their own pathways and simulate how a change in an input into the system (substrate concentration) can propagrate through the the rest of the system.
            The teachers will also have special permission to add "verified pathways" for all students to be able to check their work against.
        </p>
        <div class="dialog-body-diagram-section">
            <h3 class="dialog-body-section-header">Project Stack Diagram</h3>
            <div class="dialog-body-stack-lists">
            <div>
                <h4>Frontend Tools:</h4>
                <ol>
                <li>React</li>
                <li>Bootstrap</li>
                <li>React Flow</li>
                <li>React Router</li>
                </ol>
            </div>
            <div>
                <h4>Backend Tools:</h4>
                <ol>
                <li>Django</li>
                <li>Django REST Framework</li>
                <li>NGINX</li>
                <li>Gunicorn</li>
                <li>Postgres </li>
                <li>Docker</li>
                </ol>
            </div>
            </div>
            <img alt="biopath architecture" src="media/biopath-architecture.png">
        </div>
        <div class="dialog-body-diagram-section">
            <h3 class="dialog-body-section-header">Cloud Diagram</h3>
            <p>
            This diagram shows how our code gets containerized and deployed to our AWS infrastructure. 
            On merge to main, our code goes through our <b>Github Actions</b> CI/CD pipeline which results in a dockerized app which is pushed to <b>AWS ECR</b>. 
            At Which point the app runner service will grab the new container and run it.
            Our app will have access to <b>AWS SSM</b> which houses our sensitive information as well as our <b>AWS RDS Postgres</b> instance.
            </p>
            <img alt="biopath workflow" src="media/biopath-dev-workflow.png">
        </div>
        <h3 class="dialog-body-section-header">My Contributions</h3>
        <h4>Technical</h4>
        <p>
            Even though I worked on many parts of this project, as did the rest of my group, my work on this project was generally focused building out the frontend application and pushing the project to AWS.
        </p>
        <h4>Non-technical</h4>
        <p>
            A major portion of the project which our group had to undertake was speaking with stakeholders, understanding their needs for the project, and making sure our design was well thought out and documented. 
            It was very important to us a group to set a good foundation for the project knowing that this project will be inherited.
            On top of machine generated documentation, we also wrote design docs which explained the intention behind the decisions that we made and how to get started with our code.
        </p>
        <p>
            Something that was also important to us was making sure that the inteded audience was actually getting something out of using our app.
            To ensure this we regularly met with our sponser to demo our work to ensure we were on the right track.
            We also rolled our app out to be used by students to gather data on how our app is used and how it performed.
        </p>
        </div>
        <div class="project-links">
        <a class="word-link" href="https://github.com/SD-2022-CPSC-10/BioPath" target="_blank" rel="noopener noreferrer">
            Code</a>
        <a class="word-link" href="https://ifdfgjpy82.us-west-2.awsapprunner.com" target="_blank" rel="noopener noreferrer">
            Demo</a>
        <a class="word-link" href="https://github.com/cstainsby/BiopathPoster" target="_blank" rel="noopener noreferrer">
            Poster</a>
        </div>
    </div>
    </dialog>
