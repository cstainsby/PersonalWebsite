<!-- 
    I will handle scroll by having a currIndex start at startingIndex
    Every time a button is clicked causing a index shift the currIndex will be 
    changed accordingly
    based on the itemsVisibleAtOnce, that will dictate how many elements higher than the
    current index to show
 -->

<script lang="ts">
    interface DynamicSideScrollComponentProps {
        title: String 
        allItems: Array<T>,
        itemsVisibleAtOnce: number,
        startingIndex: number
    }

    export let title: DynamicSideScrollComponentProps["title"]
    export let allItems: DynamicSideScrollComponentProps["allItems"];
    export let itemsVisibleAtOnce: DynamicSideScrollComponentProps["itemsVisibleAtOnce"]
    export let startingIndex: DynamicSideScrollComponentProps["startingIndex"]

    let currIndex = startingIndex;

    function isLeftScrollDisabled(): boolean {
        return Boolean(currIndex === 0);
    }
    function isRightScrollDisabled(): boolean {
        return Boolean(currIndex > (allItems.length - itemsVisibleAtOnce))
    }

    function scrollLeft() {
        if (currIndex > 0) {
            currIndex -= 1;
        }
    }
    function scrollRight() {
        if (currIndex < (allItems.length - itemsVisibleAtOnce)) {
            currIndex += 1;
        }
    }
    function scrollToLeftEnd() {
        currIndex = 0;
    }
    function scrollToRightEnd() {
        currIndex =  (allItems.length - itemsVisibleAtOnce)
    }

    function getDisplayedItems() {
        return allItems.slice(currIndex, currIndex + itemsVisibleAtOnce)
    }
</script>

<style lang="scss">


    .vertical-border {
        @media (min-width: 0px) and (max-width: 976px) {
            border-bottom: 2px solid var(--darkT-black-2);
            width: 180px;
        }
        @media (min-width: 976px) {
            border-left: 2px solid var(--darkT-black-2);
            height: 90px;
        }
    }

    .list-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        // justify-content: space-evenly;

        @media (min-width: 0px) and (max-width: 976px) {
            flex-direction: column;
        }
    }

    .listed-item {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        // margin-top: 12px;
        margin-right: 12px;
        margin-left: 4px;
        padding: 12px;
        border-radius: 4px;
        width: fit-content;

        border-radius: 4px;
        // border: 2px solid var(--white);
        background-color: var(--darkT-grey-2);
        border-radius: 4px;
        min-height: 160px;

        @media (min-width: 0px) and (max-width: 976px) {
            justify-content: center;
        }

        // space the text from the images slightly
        & .listed-item-text-section {
          // margin-right: 16px;
            width: 65%;
            padding: 24px;

            & p {
                margin-left: 8px;
            }
        }



        & img {
            margin-left: 4px;
            height: 6rem;
        }
    }
</style>


<div class="side-scroll-component">
    <div class="header">
        <h2>{title}</h2>
        <div class="scoll-button-group">
            <!-- {#if }
                
            {/if} -->
            <button 
                disabled={isLeftScrollDisabled()}
                on:click={() => scrollToLeftEnd()}
            >LeftEnd</button>
            <button 
                disabled={isLeftScrollDisabled()}
                on:click={() => scrollLeft()}
            >Left</button>
            <button 
                disabled={isRightScrollDisabled()}
                on:click={() => scrollRight()}
            >Right</button>
            <button 
                disabled={isRightScrollDisabled()}
                on:click={() => scrollToRightEnd()}
            >RightEnd</button>
        </div>
    </div>

    <div class="list-container">
        {#each getDisplayedItems() as edOrCred, edOrCredIndex}
            <div class="listed-item">
                <div>
                    <h3>{edOrCred.title}</h3>
                    {#if edOrCred.titleCaption}
                        <p>{edOrCred.titleCaption}</p>
                    {/if}
                    <p>{edOrCred.fromWho}</p>
                    <p>
                        {convertDateToDisplayDateString(edOrCred.startDate)} - 
                        {#if edOrCred.endDate}
                            {convertDateToDisplayDateString(edOrCred.endDate)}
                        {:else}
                            In Progress
                        {/if}
                    </p>
                </div>
                <img src={String(edOrCred.imgPath)} alt={String(edOrCred.imgAltText)}/>
            </div>
            {#if edOrCredIndex < educationAndCredentials.length - 1}
                <div class="vertical-border"></div>
            {/if}
        {/each}
    </div>
</div>