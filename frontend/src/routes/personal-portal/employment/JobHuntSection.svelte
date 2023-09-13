<script lang="ts">
    import CollapsableSection from "$components/CollapsableSection.svelte";
    import FormContainer from "$components/forms/FormContainer.svelte";
    import GenericModal from "$components/modal/genericModal.svelte"
    import type { JobApplication } from "$lib/templates/JobApplication";

    // stores the applications sent out since last job was accepted
    let currentApplicationList: JobApplication[] = []

    let walgreensApp: JobApplication = {
        companyName: "Walgreens",
        positionName: "Software Engineer (RxR) Bellevue V",
        appliedOn: new Date(2023, 7, 12),
        location: [
            {
                cityName: "Bellevue",
                stateName: "Washington",
                countryName: "United States"
            }
        ],
        salaryRangeLow: 75000,
        salaryRangeHigh: 75000,
        referencesUsed: [],
        rejected: "automated email",
        status: "Rejected"
    } 
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)

    const handleSubmit = () => {

    }
</script>

<style lang="scss">
    table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 4px;
    }

    th, td {
        border: 1px solid var(--darkT-black-1);
        padding: 8px;
        // min-width: 24px;
    }

    th {
        background-color: var(--darkT-black-1);
    }

    tr:nth-child(even) {
        background-color: var(--darkT-grey-2);
    }

    .table-container {
        max-width: 90%; 
        margin: 0 auto;
        
        & > .header {
            display: flex;
            flex-direction: row;
        }
    }
</style>

<CollapsableSection 
    title="Job Hunt"
    collapsableSectionId="JobHuntCollapsableSection">
    <p slot="info">
        This section, by default, will show you the jobs that you have applied for since marking 
        a job as <b>"Accepted"</b> in the status section. If you want to see the a full list of 
        applications follow <a>This Link</a> 
    </p>
    <div slot="content" class="table-container">
        <div class="header">
            <h3>Applications Sent</h3>
            <GenericModal> 
                <p slot="title">title</p>
                <button class="add-button word-link" slot="open-clickable-element">Add</button>
                <div slot="content">
                    <FormContainer>
                        <form 
                            action="?/postJobApplication" 
                            method="POST" 
                            on:submit|preventDefault={handleSubmit}>
                            <label>
                                Company Name
                                <input name="companyName" type="text"/>
                            </label>
                            <label>
                                Position Name
                                <input name="positionName" type="text"/>
                            </label>
                            <label>
                                Position Id*
                                <input name="positionName" type="text"/>
                            </label>
                            <label>
                                Posted On*
                                <input name="postedOn" type="date" />
                            </label>
                            <label>
                                Applied On
                                <input name="appliedOn" type="date" />
                            </label>
                            <label>
                                Location
                                <input name="location" type="text"/>
                            </label>
                            <label>
                                Salary Range Low
                                <input name="salaryRangeLow" type="number"/>
                            </label>
                            <label>
                                Position Id*
                                <input name="positionName" />
                            </label>

                            <button class="word-link">Save</button>
                        </form>
                    </FormContainer>
            
                </div>
            </GenericModal>
        </div>
        <table>
            <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Postition Name</th>
                <th>Position Id</th>
                <th>Posted On</th>
                <th>Applied On</th>
                <th>Location</th>
                <th>Salary Range Low</th>
                <th>Salary Range High</th>
                <th>References Used</th> 
                <th>Rejection Method</th>
                <th>Status</th>
            </tr>
            {#each currentApplicationList as application, applicationIndex }
                <tr>
                    <td>{applicationIndex}</td>
                    <td>{application.companyName}</td> 
                    <td>{application.positionName}</td>
                    <td>{application.positionId ? application.positionId : "None"}</td>
                    <td>{application.postedOn ? application.postedOn : "Unknown"}</td>
                    <td>{application.appliedOn.toDateString()}</td>
    
                    <td>
                        {
                            application.location.length === 1 
                                ? application.location[0].cityName
                                : `${application.location.length} locations`
                        }
                    </td>
    
                    <td>{application.salaryRangeLow ? application.salaryRangeLow : ""}</td>
                    <td>{application.salaryRangeHigh ? application.salaryRangeHigh : ""}</td>
                    <td>{application.referencesUsed.length}</td>
                    <td>{application.rejected}</td>
                    <td>{application.status}</td>
                </tr>
            {/each}
        </table>
    </div>
</CollapsableSection>