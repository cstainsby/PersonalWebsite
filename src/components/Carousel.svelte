<!-- 
    I will handle scroll by having a currIndex start at startingIndex
    Every time a button is clicked causing a index shift the currIndex will be 
    changed accordingly
    based on the itemsVisibleAtOnce, that will dictate how many elements higher than the
    current index to show
 -->

<script lang="ts">
    import { onMount } from 'svelte'


    // let SwiperCode;
    // onMount(async () => {
    //     SwiperCode = (await import("https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"))
    // })

    // import function to register Swiper custom elements
    import { register } from 'swiper/element/bundle';
    // register Swiper custom elements
    register();


    interface DynamicSideScrollComponentProps {
        title: String 
        allItems: [],
        itemsVisibleAtOnce: number,
        startingIndex: number
    }

    // const 

    export let title: DynamicSideScrollComponentProps["title"]
    export let allItems: DynamicSideScrollComponentProps["allItems"];
    export let itemsVisibleAtOnce: DynamicSideScrollComponentProps["itemsVisibleAtOnce"]
    export let startingIndex: DynamicSideScrollComponentProps["startingIndex"]

    // the current index of the list
    let currIndex = startingIndex;
    // indicates whether the carousel is in motion or not
    let moving = false; 
    // time in milliseconds it takes for the transition to happen
    const transitionTime = 500;

    // function isLeftScrollDisabled(): boolean {
    //     return Boolean(currIndex === 0);
    // }
    // function isRightScrollDisabled(): boolean {
    //     return Boolean(currIndex > (allItems.length - itemsVisibleAtOnce))
    // }
    

    // function scrollLeft() {
    //     if (!moving && currIndex > 0) {
    //         currIndex -= 1;
    //         moveCarouselToIndex(currIndex);
    //     }
    // }
    // function scrollRight() {
    //     if (!moving && currIndex < (allItems.length - itemsVisibleAtOnce)) {
    //         currIndex += 1;
    //         moveCarouselToIndex(currIndex);
    //     }
    // }
    // function scrollToLeftEnd() {
    //     if (!moving) {
    //         currIndex = 0;
    //         moveCarouselToIndex(currIndex);
    //     }
    // }
    // function scrollToRightEnd() {
    //     if (!moving) {
    //         currIndex =  (allItems.length - itemsVisibleAtOnce);
    //         moveCarouselToIndex(currIndex);
    //     }
    // }

    // function moveCarouselToIndex(index: number) {
    //     if (!moving) {
    //         // disable interaction with the carousel until transition is over
            
    //     }
    // }

    // function getDisplayedItems() {
    //     return allItems.slice(currIndex, currIndex + itemsVisibleAtOnce)
    // }

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
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
    <h2>{title}</h2>

    <swiper-container class="list-container">
        {#each getDisplayedItems() as edOrCred, edOrCredIndex}
            <swiper-slide class="listed-item">
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
            </swiper-slide>
            {#if edOrCredIndex < educationAndCredentials.length - 1}
                <div class="vertical-border"></div>
            {/if}
        {/each}
    </swiper-container>
</div>