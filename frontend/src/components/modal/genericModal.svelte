<script lang="ts">
    import type { GithubInfo } from "$lib/templates/Project";
    import snarkdown from "snarkdown"
    import Spinner from "../Spinner.svelte";
    import { timeout } from "$lib/frontendUtil";


    // interface ProjectDetailModalProps {
    //     buttonText: string
    //     projectName: string 

    //     // readme can either use a string to point to a location on 
    //     readmeSrc: "local" | "github"

    //     githubProjectInfo?: GithubInfo
    // }

    interface GenericModal {
        onOpen?: () => Promise<void>  // calls this function on open
        onClose?: () => Promise<void> // calls this function on close
    }

    // export let buttonText: ProjectDetailModalProps["buttonText"];
    // export let projectName: ProjectDetailModalProps["projectName"];
    // export let readmeSrc: ProjectDetailModalProps["readmeSrc"];
    // export let githubProjectInfo: ProjectDetailModalProps["githubProjectInfo"];

    export let onOpen: GenericModal["onOpen"];
    export let onClose: GenericModal["onClose"];
  
    let showDialog: boolean = false; // toggle for showing modal
    let isLoading: boolean = true;   // toggle for showing that modal is lodaing

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


  
    const openDialog = () => {
        showDialog = true;
        isLoading = true;
        disablePageScroll();

        if (onOpen !== undefined) {
            onOpen()
                .then(() => {
                    isLoading = false;
                })
        } else {
            isLoading = false;
        }
    };

    const closeDialog = () => {
        if (onClose !== undefined) {
            onClose()
                .then(() => {
                    isLoading = false;
                })
        } else {
            isLoading = false;
        }

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

<!-- open button allows for any clickable to trigger the open procedure -->
<button class="word-link" on:click={openDialog}>
    <slot name="open-clickable-element"/>
</button>
{#if showDialog === true}
    <div class="modal-overlay">
        <div class="dialog">
            <div class="dialog-header">
                <h1>
                    <slot name="title"/>
                </h1>
                <button on:click={closeDialog}>
                    <img src="media/close.png" alt="Close" height="20">
                </button>
            </div>
            <hr/>

            <div class="dialog-body">
                {#if isLoading}
                    <Spinner/>
                {:else}
                    <slot name="content"/>
                {/if}
            </div>
        </div>
    </div>
{/if}