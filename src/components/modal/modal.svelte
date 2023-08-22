
<script lang="ts">
    import { onMount } from 'svelte';

    interface ModalProps {
        buttonText: String
    }

    export let buttonText: ModalProps["buttonText"];
  
    let showDialog = false;


    // Function to enable scrolling
    function enableScroll() {
        const body = document.body;
        body.classList.remove('no-scroll');
    }

    // Function to disable scrolling
    function disableScroll() {
        const body = document.body;
        body.classList.add('no-scroll');
    }
  
    const openDialog = () => {
        showDialog = true;
    };
    const closeDialog = () => {
        showDialog = false;
    };
  
    // Close the dialog when the component is mounted
    onMount(() => {
        closeDialog();
    });
</script>
  

<style lang="scss">
    .modal-container {
        text-align: center;
        margin: 2rem;
    }
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9998;
    }
  
    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 9999;
    }
  
    .dialog h2 {
        margin-top: 0;
    }

    dialog {
        & .proj-dialog-header {
            display: flex;
            flex-direction: row;
            align-items: center;

            & a {
            margin-left: auto;
            margin-right: 24px;
            }
        }
        & .proj-dialog-body {
            padding: 12px;

            & p {
            padding-left: 12px;
            }

            & .dialog-body-diagram-section {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-bottom: 32px;

                // adjust diagram display direction when screen gets too small
                @media (min-width: 0px) and (max-width: 1024px) {
                    flex-direction: column;
                }

                & .dialog-body-stack-lists {
                    display: flex;
                    flex-direction: row;

                    & div {
                    padding-right: 12px;
                    }
                }

                & img {
                    @media (min-width: 1024px) {
                    max-width: 45%;
                    max-height: 300px;
                    }

                    // ensure diagram stays a readable size on smaller screens
                    @media (min-width: 0px) and (max-width: 1024px) {
                    width: 75%;
                    height: auto;
                    }
                }

                & h3 {
                    max-width: 128px;
                    margin-right: 12px;
                }
            }
        }
        }
  </style>
  
<button class="word-link modal" on:click={openDialog}>{ buttonText }</button>
{#if showDialog === true}
    <!-- <button class="backdrop" on:click={closeDialog}>Close</button> -->
    <div class="dialog">
        <h2>Dialog Title</h2>
        <p>This is the content of the dialog.</p>
        <button on:click={closeDialog}>Close</button>
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
