<script lang="ts">
    // interfaces
    import type Project from "../templates/Project";
    import type Skill from "../templates/Skill";

    // projects
    import ProjectComponent from "./project.svelte";
    import ProjectModal from "./projectModal.svelte";

    // const sampleProjects: Project[] = 

    interface ProjectImportanceObject {
        High: Project[], Medium: Project[], Low: Project[]
    }

    function groupProjectByImportance(projects: Project[]): ProjectImportanceObject {
        const importanceObj: ProjectImportanceObject = {
            High: [], Medium: [], Low: []
        }
        projects.forEach(project => {
            const projectImportance = project.importance;
            importanceObj[projectImportance].push(project)
        });
        return importanceObj;
    }

    // const projectsGroupedByImportance = groupProjectByImportance(sampleProjects);

    interface ProjectSectionProps {
        projects?: Project[] 
    }
    
    export let projects: ProjectSectionProps["projects"]
</script>

<style lang="scss">
    #projects-section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding: 6%;
        background-color: var(--darkT-grey-1);
    }
</style>


<div id="projects-section">
    {#if projects}
        {#each projects as project, projectIndex}
            <ProjectComponent {project} {projectIndex}/>
        {/each}
    {/if}
</div>