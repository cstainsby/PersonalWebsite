<!-- 
    A component used for uploading files to the website
 -->
<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { addToast } from "$lib/toastStore";
    import type { Toast } from "$lib/templates/Toast";
    import Toast from "./Toast.svelte";


    interface FileUploadProps {
        allowedNumberOfFiles: number
        fileTypeAllowed: "png" | "csv"
    }

    export let allowedNumberOfFiles: FileUploadProps["allowedNumberOfFiles"]
    export let fileTypeAllowed: FileUploadProps["fileTypeAllowed"]

    let fileInput: HTMLInputElement;
    const uploadedFilesLocalStoreKey = "uploadedFiles"

    let uploadedFiles: File[] = getUploadedFilesInLocalStorage()

    function openFileUpload() {
        fileInput.click();
    }

    /**
     * Verifies that the file passed to it is a valid file
     * @param file
     * @param vaildExtension
     */
    function isValidFile(file: File, validExtension: string): boolean {
        const [fileName, fileExtension] = file.name.split(".")

        if (fileName && fileExtension && fileExtension === validExtension) {
            return true;
        }
        return false;
    }
    
    /**
     * Store the currently uploaded files to local storage to persist through restart
     * @param uploadedFiles
     */
    function setUploadedFilesInLocalStorage(uploadedFiles: File[]) {
        const fileJsonString = JSON.stringify(uploadedFiles)
        localStorage.setItem(uploadedFilesLocalStoreKey, fileJsonString)
        console.log("Placed file into local store: " + fileJsonString);
        
    }

    /**
     * get any files which may be stored in local storage
     */
    function getUploadedFilesInLocalStorage(): File[] {
        const fileJsonString = localStorage.getItem(uploadedFilesLocalStoreKey)

        if (fileJsonString) {
            const parsedFiles: File[] = JSON.parse(fileJsonString)
            return parsedFiles
        } else {
            return []
        }
    }

    function handleFileUpload(e: Event) {
        const input = e.target as HTMLInputElement
        const file = input?.files?.[0]
        
        if (file && uploadedFiles.length < allowedNumberOfFiles) {

            if (isValidFile(file, fileTypeAllowed)) {
                uploadedFiles = [...uploadedFiles, file]
                setUploadedFilesInLocalStorage(uploadedFiles)

                const fileSuccessfullyUploadedToast: Toast = {
                    type: "success",
                    message: "File successfully added",
                    timeoutTime: 5000 
                }
                addToast(fileSuccessfullyUploadedToast)
            } else {
                console.log("Error: invalid file upload");
                
                const invalidFileErrorToast: Toast = {
                    type: "error",
                    message: "Invalid file uploaded, must be png",
                    timeoutTime: 5000 
                }
                addToast(invalidFileErrorToast)
            }
        }
    }

    onMount(() => {
        const storedFiles = localStorage.getItem(uploadedFilesLocalStoreKey);
        if (storedFiles) {
            uploadedFiles = JSON.parse(storedFiles);
        }
    });

    // Hook to save files to localStorage on component update
    onDestroy(() => {
        localStorage.setItem(uploadedFilesLocalStoreKey, JSON.stringify(uploadedFiles));
    });
</script>


 <style lang="scss">
    .file-upload {
        min-width: 50%;
        // background-color: var(--white);
    }
 </style>


<div class="file-upload">
    {#if uploadedFiles.length < allowedNumberOfFiles}
        <button on:click="{openFileUpload}">Upload File</button>
        <input
            type="file"
            accept="*"
            style="display:none;"
            bind:this="{fileInput}"
            on:change="{handleFileUpload}"
        />
    {/if}
    <ul>
        {#each uploadedFiles as file}
          <li>{file.name}</li>
        {/each}
    </ul>
</div>