
<style>
    :global(form) {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: auto;
    }
  
    :global(label) {
        display: block;
        margin-bottom: 10px;
    }
  
    :global(input) {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        box-sizing: border-box;
    }
  
    :global(button) {
        margin-top: 10px;
    }
</style>

<slot/>