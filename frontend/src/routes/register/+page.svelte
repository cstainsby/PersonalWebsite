<script lang="ts">
	import { enhance } from '$app/forms'
    import FormContainer from '../../components/forms/FormContainer.svelte';

	export let form;
</script>


<FormContainer>
    <form 
        action="?/register" 
        method="POST" use:enhance>
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
            <a href="/login" style="color: var(--blue)">Login</a>
        </p>
        <button class="word-link">Sign Up</button>
    </form>
</FormContainer>