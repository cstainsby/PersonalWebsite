<script lang="ts">
    import ProjectSection from "../components/Section_Projects.svelte";
    import HeaderSection from "../components/Section_Header.svelte";
    import SkillSection from "../components/Section_Skills.svelte";
    import AboutMeSection from "../components/Section_AboutMe.svelte";
    import ContactMeSection from "../components/Section_ContactMe.svelte";
    import ErrorSection from "../components/Section_Error.svelte";

    import type { PageServerData } from './$types';
    import type { WebsiteData } from "$lib/templates/WebsiteData";
    import { websiteBlob } from "$lib/localCache";

  
    export let data;
    
    const websiteData: WebsiteData | undefined = data.jsonBlob;
</script>

<style lang="scss">
    #personal-website-home {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--darkT-grey-1);

        #page-content {
            padding-left: 6%;
            padding-right: 6%;
        }
    }
</style>

<div id="personal-website-home">
    {#if websiteData}
    <HeaderSection 
        title={websiteData.title}
        extraDescriptor={websiteData.extraDescriptor}
        links={websiteData.professionalLinks}/>

    <div id="page-content">
        <ProjectSection
            projects={websiteData.projects}/>

        <AboutMeSection
            jobs={websiteData.jobs}
            education={websiteData.education}
            personalBlurbs={websiteData.personalBlurbs}
            />


        <SkillSection
            skillCollections={websiteData.skills}/>
    </div>

    <ContactMeSection
        phoneNumber={websiteData.user.phoneNumber}
        email={websiteData.user.email}
        links={websiteData.professionalLinks}/>
    {:else}
    <ErrorSection/>
    {/if}
</div>