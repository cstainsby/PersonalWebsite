<script>
    import CollapsableSection from "$components/CollapsableSection.svelte";

</script>

<CollapsableSection
    title="Current Employment Status"
    collapsableSectionId="CurrentEmploymentCollapableSection">
    <p slot="info">
        This section, by default, will show you the jobs that you have applied for since marking 
        a job as <b>"Accepted"</b> in the status section. If you want to see the a full list of 
        applications follow <a>This Link</a> 
    </p>
    <div slot="content">
    </div>
</CollapsableSection>