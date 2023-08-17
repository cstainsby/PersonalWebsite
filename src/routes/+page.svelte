<script lang="ts">
    import ProjectSection from "../components/projectSection.svelte";
    import HeaderSection from "../components/headerSection.svelte";
    import SkillSection from "../components/skillSection.svelte";
    import AboutMeSection from "../components/aboutMeSection.svelte";
    import ContactMeSection from "../components/contactMeSection.svelte";

    import type { PageServerData } from './$types';
    import type { WebsiteData } from '$lib/websiteInterfaces';

  
    export let data: PageServerData;
    
    const websiteData: WebsiteData = data.jsonBlob;
</script>

<style lang="scss">
    #personal-website-home {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--darkT-grey-1);
    }
</style>


<div id="personal-website-home">
    <HeaderSection 
        title={websiteData.title}
        extraDescriptor={websiteData.extraDescriptor}
        links={websiteData.professionalLinks}/>

    <ProjectSection
        projects={websiteData.projects}/>

    <AboutMeSection/>


    <SkillSection
        skillCollections={websiteData.skills}/>



    
    <ContactMeSection
        phoneNumber={websiteData.user.phoneNumber}
        email={websiteData.user.email}
        links={websiteData.professionalLinks}/>
</div>