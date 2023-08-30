<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import SuccessIcon from "./icons/SuccessIcon.svelte";
    import ErrorIcon from "./icons/ErrorIcon.svelte";
    import InfoIcon from "./icons/InfoIcon.svelte";
    import CloseIcon from "./icons/CloseIcon.svelte";
  
    const dispatch = createEventDispatcher();
  
    export let type = "error";
</script>
  
<article class={type} role="alert" transition:fade>
    {#if type === "success"}
        <SuccessIcon width="1.1em" />
    {:else if type === "error"}
        <ErrorIcon width="1.1em" />
    {:else}
        <InfoIcon width="1.1em" />
    {/if}

    <div class="text">
        <slot />
    </div>

    <button class="close" on:click={() => dispatch("dismiss")}>
        <CloseIcon width="0.8em" />
    </button>
</article>
  
  <style lang="scss">
        article {
            color: var(--white);
            padding: 0.75rem 1.5rem;
            border-radius: 0.2rem;
            display: flex;
            align-items: center;
            margin: 0 auto 0.5rem auto;
            width: 20rem;
        }
        .error {
            background: IndianRed;
        }
        .success {
            background: MediumSeaGreen;
        }
        .info {
            background: SkyBlue;
        }
        .text {
            margin-left: 1rem;
        }
        button {
            color: var(--white);
            background: transparent;
            border: 0 none;
            padding: 0;
            margin: 0 0 0 auto;
            line-height: 1;
            font-size: 1rem;
        }
  </style>