<script lang="ts">
    import ProjectSection from "../components/projectSection.svelte";
    import HeaderSection from "../components/headerSection.svelte";
    import SkillSection from "../components/skillSection.svelte";
    import AboutMeSection from "../components/aboutMeSection.svelte";
    import ContactMeSection from "../components/contactMeSection.svelte";

    import { env } from '$env/dynamic/private';

    async function getJson() {
        const jsonPageInfo = await fetch(env.JSON_BLOB_LOCATION)
        console.log(jsonPageInfo);
    }    
    getJson()
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
    <HeaderSection/>
    <ProjectSection/>
    <AboutMeSection/>
    <SkillSection/>
    <ContactMeSection/>
</div>