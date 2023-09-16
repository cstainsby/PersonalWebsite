
<script lang="ts">
    import { publicUserData } from "$lib/userStore";


    let accountDropdownLabel: string = "";
    let accountDropdownToggle: boolean = false;
    let isSignedIn = false;
    publicUserData.subscribe(data => {
        if (data && data.authenticated) {
            isSignedIn = true

            if (data.name && data.name.length > 0) {
                accountDropdownLabel = data.name[0].toUpperCase()
            } 
        } else {
            isSignedIn = false;
            accountDropdownLabel = "";
        }
    })

    function onSignOutButtonClick() {
        fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if required (e.g., authorization token)
        },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            publicUserData.set(null)
        })
        .then(data => {
            // Handle successful response (if any)
            console.log('Logged out successfully', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error logging out:', error);
        })
        .finally(() => {
            accountDropdownToggle = false;
        });
    }
</script>

<style lang="scss">
    .account-button {
        height: 45px;
        width: 45px;
        z-index: 99999;
        background-color: var(--white);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
    }
    
    .dropdown {
        position: absolute;
        top: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--darkT-grey-1);
        border-radius: 4px;
        padding: 4px;
        margin-top: 4px;
        width: 128px;
        border: 2px solid var(--white);

        & > a, button {
            padding: 8px;
            border-radius: 4px;
            text-align: start;
        }
        & > a:hover {
            background-color: grey;
        }
        & > button:hover {
            background-color: grey;
        }
    }

    .dropdown-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        // position: sticky;
        // top: 32px;
        // margin-bottom: 64px;
        z-index: 99999;
        position: relative;
        
        height: fit-content;
    }
</style>

<div class="dropdown-container">
    <!-- <div class="background"></div> -->
    {#if isSignedIn}
        <button class="account-button" on:click={() => { accountDropdownToggle = !accountDropdownToggle }}>
            <h2>{accountDropdownLabel}</h2>
        </button>
    {:else}
        <a class="account-button" href="/auth/login">
            <img src="media/user.png" alt="Sign In" title="Sign In" height="30px" width="30px"/>
        </a>
    {/if}

    {#if accountDropdownToggle} 
    <div class="dropdown">
        <a href="/personal-portal">Profile</a>
        <a href="/personal-portal/website">Website</a>
        <a href="/personal-portal/employment">Employment</a>
        <div style="width: 80%; align-self:center;"><hr/></div>
        <button on:click={onSignOutButtonClick}>Sign Out</button>
    </div>
    {/if}
</div>