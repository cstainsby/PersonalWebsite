
<script lang="ts">
    import type { ImageLink } from "$lib/templates/ImageLink"; 

    interface ProfessionalLinkRowProps {
        imageLinks: ImageLink[]
    }

    export let imageLinks: ProfessionalLinkRowProps["imageLinks"]
</script>

<style lang="scss">
    // links to indeed, github, etc
    .proffesional-link-row {
        position: relative;
        display: flex;
        justify-content: start;
        padding-top: 24px;
        z-index: var(--zind-foreground);

        & .image-link {
            margin-right: 24px;
        }
    }

    // for links with images displayed rather than words
    .image-link {
        display: inline-block;
        position: relative;
    }
    .image-link img {
        transition: transform var(--button-transition-time) ease-in-out;
    }
    .image-link:hover img {
        transform: scale(1.15); /* Increase the size of the image on hover */
    }
</style>

<div class="proffesional-link-row">
    {#if imageLinks}
        {#each imageLinks as imageLink}
            <a class="image-link" href={imageLink.href} target="_blank" rel="noopener noreferrer" title={imageLink.title}>
                <img src={imageLink.imgPath} alt={imageLink.altText} height="40px" width="40px" />
            </a>  
        {/each} 
    {/if}
</div>