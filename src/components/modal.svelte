
<script lang="ts">
    import { onMount } from 'svelte';

    interface ModalProps {
        buttonText: String
    }

    export let buttonText: ModalProps["buttonText"];
  
    let showDialog = false;
  
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
    // .modal-container {
    //     text-align: center;
    //     margin: 2rem;
    // }
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
  
<button class="word-link" on:click={openDialog}>{ buttonText }</button>
{#if showDialog === true}
    <button class="backdrop" on:click={closeDialog}>Close</button>
    <div class="dialog">
        <h2>Dialog Title</h2>
        <p>This is the content of the dialog.</p>
        <button on:click={closeDialog}>Close</button>
    </div>
{/if}
  
