<script lang="ts">
    import FileUpload from "../fileUpload.svelte";

    let education = {
        title: '',
        titleCaption: '',
        fromWho: '',
        imgPath: '',
        imgAltText: '',
        startDate: '',
        endDate: ''
    };
  
    function handleSubmit() {
        console.log(education);
        // Here, you can handle the form submission, e.g., send data to a server
    }
  </script>
  
<form on:submit|preventDefault="{handleSubmit}">
    <label>
        Title
        <input type="text" bind:value="{education.title}" required />
    </label>

    <label>
        Title Caption
        <input type="text" bind:value="{education.titleCaption}" />
    </label>

    <label>
        From Who
        <input type="text" bind:value="{education.fromWho}" required />
    </label>

    <!-- <label>
        Image Path
        <input type="text" bind:value="{education.imgPath}" required />
    </label>

    <label>
        Image Alt Text
        <input type="text" bind:value="{education.imgAltText}" required />
    </label> -->
    <label>
        Display Image
        <FileUpload 
            allowedNumberOfFiles={1} 
            fileTypeAllowed="png"/>
    </label>

    <label>
        Start Date
        <input type="date" bind:value="{education.startDate}" required />
    </label>

    <label>
        End Date
        <input type="date" bind:value="{education.endDate}" />
    </label>

    <button class="word-link" type="submit">Submit</button>
</form>
  
<style>
    form {
        max-width: 400px;
        margin: auto;
    }
  
    label {
        display: block;
        margin-bottom: 10px;
    }
  
    input {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        box-sizing: border-box;
    }
  
    button {
    
         margin-top: 10px;
    }
</style>
  