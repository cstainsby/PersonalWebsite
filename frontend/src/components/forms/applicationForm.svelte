
<script lang="ts">
    type Salary = {
        amount: number | {
            rangeLow: number,
            rangeHigh: number
        }
    }

    interface Application {
        jobTitle: string,
        jobId?: string,
        company: string,
        datePositionPosted: Date,
        dateAppliedOn: Date,
        location: string[],
        salary?: Salary
        response?: boolean
        comment: string
    }

    let isSalaryRanged: boolean = false;
    let enteredLocations: string[] = []

    /**
     * Makes the example locations examples a bit more fun
     */
    function getSampleLocationBasedOnListIndex(index: number): string {
        let sampleLocations = [
            "Seattle", "Bellevue", "Kirkland", "Redmond", "Renton", "Everett"
        ]
        const sampleLocationIndex: number = index % sampleLocations.length
        return sampleLocations[sampleLocationIndex]
    }
</script>

<style lang="scss">
    #application-form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    label {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
    }

    .text-input {
        height: 24px;
    }
</style>

<form id="application-form" 
    method="POST"
    action="?/application">
    <label>
        Job Title
        <input name="jobTitle" class="text-input" placeholder="e.g. Software Engineer" type="text" required/>
    </label>

    <label>
        Job Id
        <input name="jobId" class="text-input" placeholder="Positions unique identifier" type="text"/>
    </label>

    <label>
        Company
        <input name="company" class="text-input" placeholder="e.g. Google" type="text" required/>
    </label>

    <label>
        Position Posted On
        <input name="jobTitle" class="text-input" type="date" required/>
    </label>

    <label>
        Applied On
        <input name="jobTitle" class="text-input" type="date" required/>
    </label>

    <label>
        <div>
            Location
            <button on:click={() => enteredLocations.push("")}>Add</button>
        </div>
        {#each enteredLocations as location, locationAtI}
            <div>
                <input name="jobTitle{locationAtI}" 
                    class="text-input" 
                    placeholder="e.g. {getSampleLocationBasedOnListIndex(locationAtI)}" 
                    type="text" 
                    value="{location}"
                    required/>
                <button on:click={() => enteredLocations.splice(locationAtI, 1)}>Remove</button>
            </div>
        {/each}
    </label>

    <label>
        Is Salary Ranged
        <input name="salaryRangedCheckbox" type="checkbox" bind:checked={isSalaryRanged}/>
    </label>
    {#if isSalaryRanged}
        <label>
            Salary Range
            <input name="salaryRangedCheckbox" placeholder="Starting At" class="text-input" type="text"/>
            <input name="salaryRangedCheckbox" placeholder="Goes To" class="text-input" type="text"/>
        </label>
    {:else}
        <label>
            Salary
            <input name="salary" class="text-input" placeholder="e.g. 70,000" type="text" required/>
        </label>
    {/if}

    <button class="word-link button" 
            type="submit" 
            name="application-submit">Post</button>
</form>