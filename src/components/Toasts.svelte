<script lang="ts">
    import ToastComponent from "./Toast.svelte";
    import { dismissToast, toasts } from "$lib/store"
</script>
  
{#if $toasts}
<section>
    {#each $toasts as toast (toast.id)}
    <ToastComponent
        type={toast.type}
        on:dismiss={() => dismissToast(toast.id)}>{toast.message}
    </ToastComponent>
    {/each}
</section>
{/if}
  
<style lang="postcss">
    section {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        margin-top: 1rem;
        justify-content: center;
        flex-direction: column;
        z-index: 1000;
    }
</style>