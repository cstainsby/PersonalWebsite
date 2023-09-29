

<script lang="ts">
    import type { Toast } from "$lib/templates/Toast";

    interface FormContainerProps {
        
    }



</script>


<style lang="scss">
    .standard-form-container {
        max-width: 400px;
        margin: auto;
    }

    .standard-form-container :global(form) {
        display: flex;
        flex-direction: column;
    }
  
    .standard-form-container :global(label) {
        display: block;
        margin-top: 12px;
        margin-bottom: 8px;
    }
  
    .standard-form-container :global(input) {
        width: 100%;
        padding: 8px;
        margin-bottom: 4px;
        box-sizing: border-box;
    }
  
    .standard-form-container :global(button) {
        margin-top: 10px;
    }
</style>

<div class="standard-form-container">
    <slot/>
</div>
