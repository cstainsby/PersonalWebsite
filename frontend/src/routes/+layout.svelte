<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'

    import { publicUserData } from "$lib/userStore";
    
    import Toasts from "../components/Toasts.svelte";
  
    export let data;
  
    let { supabase, session } = data
    $: ({ supabase, session } = data)
    
    if (data?.supabase && data?.session) {
        // get public user data for rendering in page when a session is active and 
        // database connection is reachable
        data.supabase.auth.getUser()
            .then(userRes => {
                const { data: { user }} = userRes
                
                publicUserData.set({
                    name: user?.user_metadata.name ? user?.user_metadata.name : "",
                    authenticated: user?.aud ? (user.aud === "authenticated") : false,
                    userId: user?.id ? user.id : "",
                    email: user?.email ? user.email : ""
                })
            })
    }
  
    onMount(() => {
        // root layout monitors the state of authentication 
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            } else {
            }
        })
    
        return () => subscription.unsubscribe()
    });
</script>

<style lang="scss">
    // ------------------------------------------------------------------
    //    root variables
    // ------------------------------------------------------------------
    :root {
        // color palatte
        --white: #e4e4e4;
        --blue: #007acc;
        --darkT-grey-1: #3e3e42;
        --darkT-grey-2: #2d2d30;
        --darkT-black-1: #252526;
        --darkT-black-2: #1e1e1e;

        // transition timers 
        --button-transition-time: 0.2s;

        // z-index indices
        --zind-perm-top: 999;
        --zind-foreground: 4;
        --zind-middleground: 3;
        --zind-background: 2; 
        --zind-perm-end: 1;

        // font 
        --font: "Roboto";
    }


    // ------------------------------------------------------------------
    //    overrides of html provided elements
    // ------------------------------------------------------------------
    :global(html) {
        scroll-behavior: smooth;
        // font-family: var(--font), sans-serif;
        font-family: "Roboto";
        background-color: var(--darkT-black-1);
        font-size: 16px; 
        overflow: auto;
    }
    :global(header) {
        height: 0px;
    }

    :global(body) {
        margin: 0px;
        font-size: 1rem;
        color: var(--white);
    }
    :global(input[type="text"], 
            input[type="email"],
            textarea) {
        font-size: 1rem;
        font-family: var(--font);
    }
    :global(button, a) {
        /* Reset default styles for buttons and links */
        display: inline-block; /* Buttons and links should have the same inline-block behavior */
        padding: 0;
        margin: 0;
        border: none;
        background-color: transparent;
        color: inherit; /* Inherit the color from the parent */
        font: inherit; /* Inherit the font from the parent */
        text-decoration: none; /* Remove underline from links */
        cursor: pointer; /* Show pointer cursor on hover */
    }

    // ------------------------------------------------------------------
    //    global link classes
    // ------------------------------------------------------------------
    :global(.word-link) {
        max-height: 48px;
        margin-right: 8px;
        margin-top: 8px;
        margin-bottom: 8px;
        display: inline-block;
        padding: 12px 24px;
        font-size: 1rem;
        // font-weight: bold;
        text-align: center;
        text-decoration: none;
        border: none;
        color: var(--white);
        border-radius: 4px;
        background-color: var(--blue);
        transition: transform var(--button-transition-time) ease-in-out, box-shadow var(--button-transition-time);/* Add a smooth transition */
        // margin: 1%;
    }
    :global(.word-link:hover) {
        cursor: pointer;
        background-color: var(--blue);
        box-shadow: 1px 4px var(--darkT-black-2);
        transform: translate(0px, -4px);
    } 

    // for links with images displayed rather than words
    :global(.image-link) {
        display: inline-block;
        position: relative;
    }
    :global(.image-link img) {
        transition: transform var(--button-transition-time) ease-in-out;
    }
    :global(.image-link:hover img) {
        transform: scale(1.15); /* Increase the size of the image on hover */
    }

    :global(.gradient-border) {
        position: relative;
        border-radius: 4px;
    }

    :global(.gradient-border::before) {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 10px solid transparent;
        border-image: linear-gradient(to right, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.2));
        border-image-slice: 1;
    }

    :global(.no-scroll) {
        overflow: hidden;
    }


    // ------------------------------------------------------------------
    //    layout css
    // ------------------------------------------------------------------
    // #bottom-right-link {
    //     display: none; /* Hide the link by default */
    //     position: fixed;
    //     bottom: 12px;
    //     right: 2%;
    //     padding: 10px;
    //     z-index: var(--zind-perm-top);
    // }
</style>

<div id="root-layout">
    <!-- allow each page in the app to post toast notifications -->
    <Toasts/>

    
    <slot />
</div>