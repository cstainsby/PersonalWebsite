
<script lang="ts">
    import Toast from "$components/Toast.svelte";
    import type { JobApplication, Location } from "$lib/templates/Job";
    import { addToast } from "$lib/toastStore";
    import { onMount } from "svelte";


    let isSalaryRanged: boolean = false;

    let application: JobApplication = {
        companyName: "",
        positionName: "",
        positionId: "",
        postedOn: new Date(),
        appliedOn: new Date(),
        locations: [],
        
        responsibilities: "",
        requirements: "",
        
        salary: { amount: 0 },

        referencesUsed: [],
        yearsOfExpirienceRequired: 0,
        status: "In-Progress"
    }


    function scrapeWebsiteForApplicationInformation(url: string): JobApplication {
        let applicationBuilder: JobApplication = {
            companyName: "",
            positionName: "",
            positionId: "",
            postedOn: new Date(),
            appliedOn: new Date(),
            locations: [],
            
            responsibilities: "",
            requirements: "",
            
            salary: { amount: 0 },

            referencesUsed: [],
            yearsOfExpirienceRequired: 0,
            status: "In-Progress"
        }

        return applicationBuilder
    } 

    /**
     * Fill the form with information from an application object
     * @param application
     */
    function fillForm(application: JobApplication) {

    }


    function addLocation(e: Event) {
        e.preventDefault();

        const newEmptyLocation: Location = {
            cityName: "",
            countryName: ""
        }
        application.locations = [...application.locations, newEmptyLocation]
    }

    function removeLocation(e: Event, locationIndex: number) {
        e.preventDefault()

        application.locations = application.locations.filter((_, i) => i !== locationIndex)
    }

    const handleScrapeButton = () => {
        // const application = scrapeWebsiteForApplicationInformation()
        fillForm(application);

        // const questionToast: Toast = {
        //     type: "info"
        //     message: string
        //     timeoutTime: 5000 // in ms
        // }
        // addToast()
    }
</script>

<style lang="scss">
    .checkbox-toggle-container {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > input {
            height: fit-content;
            width: fit-content;
        }
    }

    #scrape-input-bar {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > button {
            margin: 4px;
        }
    }
</style>


<div>
    <label for="websiteScrapeUrl">Website to Scrape</label>
    <div id="scrape-input-bar">
        <input name="websiteScrapeUrl" class="text-input" placeholder="url" type="text">
        <button class="word-link">Scrape</button>
    </div>
</div>

<form id="application-form" 
    method="POST"
    action="?/application">
    <label for="job-title">Job Title:</label>
    <input name="jobTitle" class="text-input" placeholder="e.g. Software Engineer" type="text" required/>

    <label for="company-name">Company Name:</label>
    <input name="company-name" class="text-input" placeholder="e.g. Google" type="text" required/>

    <label for="job-id">Job Id:</label>
    <input name="job-id" class="text-input" type="text"/>

    <div class="checkbox-toggle-container">
        <label for="is-ranged-salary">Is Salary Ranged:</label>
        <input name="is-ranged-salary" type="checkbox" bind:checked={isSalaryRanged}/>
    </div>
    {#if isSalaryRanged}
        <label for="salary-range-low">Salary Range Low:</label>
        <input name="salary-range-low" placeholder="e.g. 50000" class="text-input" type="number"/>
        
        <label for="salary-range-high">Salary Range High:</label>
        <input name="salary-range-high" placeholder="e.g. 70000" class="text-input" type="number"/>
    {:else}
        <label for="salary">Salary</label>
        <input name="salary" class="text-input" placeholder="e.g. 70000" type="number" required/>
    {/if}

    <label for="posted-on">Position Posted On</label>
    <input name="posted-on" class="text-input" type="date"/>

    <label for="applied-on">Applied On:</label>
    <input name="applied-on" class="text-input" type="date" required/>

    <!-- <label>
        <div>
            Location
            <button on:click={addLocation}>Add</button>
        </div>
        {#each application.locations as location, locationAtI}
            <div>
                <input name="jobTitle{locationAtI}" 
                    class="text-input" 
                    placeholder="e.g. Seattle" 
                    type="text" 
                    bind:value={location.cityName}
                    required/>
                    <label for="jobLocation"></label>
                    <input name="jobTitle{locationAtI}" 
                    class="text-input" 
                    placeholder="e.g. WA" 
                    type="text" 
                    bind:value={location.countryName}
                    required/>
                <button on:click={(e) => removeLocation(e, locationAtI)}>Remove</button>
            </div>
        {/each}
    </label> -->

    <label for="years-of-expirience">Years Of Expirience Required:</label>
    <input name="years-of-expirience" class="text-input" type="number" required/>

    <label for="responsibilities">Responsibilities:</label>
    <textarea name="responsibilities" rows="4" cols="50"></textarea> 

    <label for="requirements">Requirements:</label>
    <textarea name="requirements" rows="4" cols="50"></textarea> 

    <button class="word-link button" 
            type="submit" 
            name="application-submit">Post</button>
</form>