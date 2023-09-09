
<script lang="ts">
    
    interface PngFilePreviewProps {
        fileName: string
        img: HTMLImageElement
    }
    export let fileName: PngFilePreviewProps["fileName"]
</script>

<style lang="scss">
    .png-file-preview {
        display: flex;
        flex-direction: row;
    }
</style>

<div class="png-file-preview">
    
</div>