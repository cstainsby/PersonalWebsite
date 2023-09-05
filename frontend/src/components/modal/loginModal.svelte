<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";

    import GenericModal from "./genericModal.svelte";

    // export let data
    // let { supabase } = data
    // // $: ({ supabase } = data)

    // let email: string
    // let password: string

    // const handleSignUp = async () => {
    //     await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //         emailRedirectTo: `${location.origin}/auth/callback`,
    //     },
    //     })
    // }

    // const handleSignIn = async () => {
    //     await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //     })
    // }

    // const handleSignOut = async () => {
    //     await supabase.auth.signOut()
    // }

    // const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
    //     switch (action.searchParams.get('provider')) {
    //         case "github":
    //             await signInWithProvider("github")
    //             break;
    //         default:
    //             break;
    //     } 
    //     cancel();
    // }

    const onOpen = async () => {}

    const onClose = async () => {}
</script>


<GenericModal {onOpen} {onClose}> 
    <span slot="title">Login</span>
    <!-- <span slot="open-clickable-element">Login</span> -->
    <button slot="open-clickable-element" class="image-link">
        <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
    </button>
    <div slot="content">
        

    </div>
</GenericModal>