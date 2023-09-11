
<script lang="ts">
    import DataSelectorSidebar from "./dataSelectorSidebar.svelte";
    
</script>

<style lang="scss">
    #edit-layout {
        display: flex;
        flex-direction: row;
    }
</style>

<div id="edit-layout">
    <a href="/">Back</a>
    <slot/>
</div>