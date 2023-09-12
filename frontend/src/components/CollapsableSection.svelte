

<script lang="ts">

    interface CollapsableSectionProps {
        title: string 
    }

    export let title: CollapsableSectionProps["title"]

    let isCollapsed = true;

    function onCollapseButtonClick() {
        isCollapsed = !isCollapsed
    }
</script>

<style lang="scss">
    .collapsable-section-header {
        display: flex;
        flex-direction: row;

        & > button {
            margin-left: auto;
        }
    }

    .informational-section {
        width: fit-content;
        background-color: var(--darkT-grey-1);
        // padding-left: 16px;
        padding: 1px;
        border-radius: 4px;
    }
</style>

<div class="collapsable-section">
    <div class="collapsable-section-header">
        <h3>{title}</h3>
        <button on:click={onCollapseButtonClick}>
            Collapse
        </button>
        <!-- <img/> -->
    </div>
    <hr/>
    {#if !isCollapsed}
        <div class="informational-section">
            <slot name="info"/>
        </div>
        <slot name="content"/>
    {/if}
</div>