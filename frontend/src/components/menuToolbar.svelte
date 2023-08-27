
<script lang="ts">
    
    let isSignedIn = false;
    let GITHUB_CLIENT_ID = "630fcc6321fa2f336446";

    function loginWithGithub() {
        console.log("logging in");
        
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`)
    }
</script>

<style lang="scss">
    #menu-toolbar {
        display: flex;
        flex-direction: row;
        z-index: 99999;
    }
</style>

<button class="word-link" on:click={() => loginWithGithub()}>Login with github</button>
<div id="menu-toolbar">
    <div id="sign-in">
        
    </div>
    <div id="settings-dropdown">

    </div>
</div>