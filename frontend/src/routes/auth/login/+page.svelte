<script lang="ts">
    import FormContainer from '../../../components/forms/FormContainer.svelte';

    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction, deserialize } from '$app/forms';
    
    import type { ActionData } from './$types';
    import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

    import type { Toast } from "$lib/templates/Toast";
    import { addToast } from "$lib/toastStore";

	// export let form;

    async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
        const data = new FormData(event.currentTarget);
    
        const response = await fetch(event.currentTarget.action, {
            method: 'POST',
            body: data,
        });
    
        const result: ActionResult = deserialize(await response.text());
        
    
        if (result.type === 'success') {
            // rerun all `load` functions, following the successful update
            await invalidateAll();

            const successToast: Toast = {
                type: "success",
                message: "Account Successfully Registered",
                timeoutTime: 5000
            }
            addToast(successToast)
        } else {
            const errorToast: Toast = {
                type: "error",
                message: "Account Creation Failed",
                timeoutTime: 5000
            }
            addToast(errorToast)
        }
    
        applyAction(result);
    }
</script>

<style lang="scss">
    // #or-login-break {
    //     display: flex;
    //     flex-direction: row;

    //     & > hr {
    //         transform: rotate(90deg);
    //     }
    // }

    p {
        padding-left: 4px;
    }

    #oauth-buttons {
        display: flex;
        flex-direction: column;

        & > button {
            height: 32px;
            border-radius: 4px;
        }
    }

    #github-oauth-btn {
        background-color: #000000;
    }
    // #discord-oauth-btn {
    //     background-color: #7e61ab;
    // }
</style>

<FormContainer>
    <!-- <form 
        action="?/login" 
        method="POST" 
        on:submit|preventDefault={handleSubmit}>
        <h1>Login</h1>
        <label>
            Email
            <input name="email" value={form?.email ?? ''} />
        </label>
        <label>
            Password
            <input type="password" name="password" />
        </label>
        <p>
            No Account:
            <a href="/auth/register" style="color: var(--blue)">Register</a>
        </p>
        <button class="word-link">Sign In</button>
    </form> -->

    <!-- <div id="or-login-break">
        <hr/>
        <h2>Or</h2>
        <hr/>
    </div> -->
    <h1>OAuth Login</h1>
    <p>Login in using 3rd party authentication services.</p>
    <hr/>
    <form id="oauth-buttons" method="POST">
        <button formaction="?/login&provider=github" id="github-oauth-btn">Github</button>
        <!-- <button id="discord-oauth-btn">Discord</button> -->
        <!-- <button id="github-oauth-btn">Microsoft</button> -->
    </form>
</FormContainer>