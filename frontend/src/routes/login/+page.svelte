<script lang="ts">
	import { enhance } from '$app/forms'

	export let form;
</script>

<form action="?/login" method="post" use:enhance>
    <input name="email" value={form?.email ?? ''} />
    <input type="password" name="password" />
    <button>Sign In</button>
</form>