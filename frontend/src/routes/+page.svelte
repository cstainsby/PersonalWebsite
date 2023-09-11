<script lang="ts">
    import ProjectSection from "../components/projectSection.svelte";
    import HeaderSection from "../components/headerSection.svelte";
    import SkillSection from "../components/skillSection.svelte";
    import AboutMeSection from "../components/aboutMeSection.svelte";
    import ContactMeSection from "../components/contactMeSection.svelte";

    import type { PageServerData } from './$types';
    import type { WebsiteData } from "$lib/templates/WebsiteData";

    import { publicUserData } from "$lib/userStore";

  
    export let data;
    
    if (data?.supabase) {
        let name = ""
        let email = ""
        let userId = "";

        publicUserData.set({
            name: name,
            userId: userId,
            email: email
        })
    }
    
    
    const websiteData: WebsiteData = data.jsonBlob;
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
</div>