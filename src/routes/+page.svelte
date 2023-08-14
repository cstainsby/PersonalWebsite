<script lang="ts">
    import ProjectSection from "../components/projectSection.svelte";
    import HeaderSection from "../components/headerSection.svelte";
    import SkillSection from "../components/skillSection.svelte";
    import AboutMeSection from "../components/aboutMeSection.svelte";
    import ContactMeSection from "../components/contactMeSection.svelte";

</script>

<style lang="scss">
    #personal-website-home {
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