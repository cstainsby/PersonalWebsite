

<script lang="ts">
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';

    interface CollapsableSectionProps {
        collapsableSectionId: string // a page wide unique identifier for the section to use to store state
        title: string 
    }
    
    export let collapsableSectionId: CollapsableSectionProps["collapsableSectionId"]
    export let title: CollapsableSectionProps["title"]

    let isCollapsed = true;
    const isCollapsedState = writable<string>(
        browser ? window.localStorage.getItem(collapsableSectionId) ?? "true" : "true"
    )
    isCollapsedState.subscribe((value) => {
        if (browser) {
            window.localStorage.setItem(collapsableSectionId, value)
        }
    })
    
    // correct the state variable isCollapsed to match what is in localStorage
    if (browser) {
        if (isCollapsedState) { 
            switch ($isCollapsedState) {
                case "true": isCollapsed = true; break;
                case "false": isCollapsed = false; break;
                default:
                    isCollapsed = true;
                    break;
            }
        } else {
            isCollapsed = true;
        }
    } else {
        isCollapsed = true
    }

    function onCollapseButtonClick() {
        isCollapsed = !isCollapsed
        window.localStorage.setItem(collapsableSectionId, String(isCollapsed))
    }
</script>

<style lang="scss">

    .collapsable-section {
        background-color: var(--darkT-grey-1);
        border-radius: 4px;
        margin: 16px;
        padding-left: 32px;
        padding-right: 32px;
        padding-top: 16px;
        padding-bottom: 16px;
    }
    .collapsable-section-header {
        display: flex;
        flex-direction: row;

        & > button {
            margin-left: auto;
        }
    }

    .collapsable-section-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }  

    .informational-section {
        width: fit-content;
        background-color: var(--darkT-grey-2);
        // padding-left: 16px;
        padding: 8px;
        margin: 8px;
        border-radius: 4px;
    }
    .informational-section :global(a) {
        color: var(--blue);
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
    <!-- <hr/> -->
    <div class="collapsable-section-content">
        {#if !isCollapsed}
            <div class="informational-section">
                <slot name="info"/>
            </div>
            <slot name="content"/>
        {/if}
    </div>
</div>