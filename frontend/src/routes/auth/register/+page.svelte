<script lang="ts">
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction, deserialize } from '$app/forms';
    
    import type { ActionData } from './$types';
    import type { ActionResult } from '@sveltejs/kit';

    import FormContainer from '../../../components/forms/FormContainer.svelte';
    import type { Toast } from "$lib/templates/Toast";
    import { addToast } from "$lib/toastStore";

	export let form: ActionData;

    let successfulRegistration: boolean = false

    async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
        const data = new FormData(event.currentTarget);
    
        const response = await fetch(event.currentTarget.action, {
            method: 'POST',
            body: data,
        });
    
        const result: ActionResult = deserialize(await response.text());

        console.log("result " + JSON.stringify(result));
        
    
        if (result.type === 'success') {
            // rerun all `load` functions, following the successful update
            await invalidateAll();
            successfulRegistration = true

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

{#if !successfulRegistration}
<FormContainer>
    <form 
        action="?/register" 
        method="POST" 
        on:submit|preventDefault={handleSubmit}>
        <h1>Register</h1>
        <label>
            Email
            <input name="email" value={form?.email ?? ''} />
        </label>
        <label>
            Password
            <input type="password" name="password" />
        </label>
        <p>
            Already have an account:
            <a href="/auth/login" style="color: var(--blue)">Login</a>
        </p>
        <button class="word-link">Sign Up</button>
    </form>
</FormContainer>
{:else}
<h1>Verify Your Email</h1>
<p>
    The email you used on sign in should have just 
    recieved a request from supabase to verify your email.
    <b>After you have verified you email so you can then sign in.</b>
</p>
{/if}