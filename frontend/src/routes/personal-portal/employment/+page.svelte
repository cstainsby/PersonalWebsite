
<script lang="ts">
    import Scroller from "@sveltejs/svelte-scroller";
    import JobHuntSection from "./JobHuntSection.svelte";
    import CurrentEmploymentSection from "./CurrentEmploymentSection.svelte";
    import PastEmploymentSection from "./PastEmploymentSection.svelte";
    import DocumentsSection from "./DocumentsSection.svelte";

    import type { Job as JobType } from "$lib/templates/Job"
    import Job from "$components/Job.svelte"

    let count: number;
	let index: number;
	let offset: number;
	let progress: number;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;

    let isCurrentlyEmployed = false

    let job: JobType = {
        "title": "Linear Algebra Researcher",
        "employer": "Gonzaga University",
        "imgPath": "media/Math-research-screenshot.png",
        "imgAltText": "Petersen Graph",
        "startDate": "2022-01",
        "endDate": "2023-05"
    }
</script>

<style lang="scss">
    
</style>

<!-- <Scroller
    {top}
    {threshold}
    {bottom}
    bind:count
    bind:index
    bind:offset
    bind:progress>
    <div slot="background">
        <button></button>
    
        <p>Section {index + 1} is currently active.</p>
      </div>
    
      <div class="foreground" slot="foreground">
        
        <section>This is the second section.</section>
        <section>This is the third section.</section>
      </div>
</Scroller> -->

<Job job={job}/>
<CurrentEmploymentSection/>
<PastEmploymentSection/>
<DocumentsSection/>
<JobHuntSection/>



{#if isCurrentlyEmployed}
    <div>

    </div>
<!-- {:else} -->
    
{/if}