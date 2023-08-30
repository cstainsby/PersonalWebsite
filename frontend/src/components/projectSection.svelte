<script lang="ts">
    // interfaces
    import type Project from "../templates/Project";
    import type Skill from "../templates/Skill";

    // projects
    import ProjectComponent from "./project.svelte";
    import ProjectModal from "./projectModal.svelte";

    interface ProjectImportanceObject {
        High: Project[], Medium: Project[], Low: Project[]
    }
    interface ProjectSectionProps {
        projects?: Project[] 
    }
    type ProjectGridAreaType = "high1" | "high2" | "med1" | "med2" | "med3" | "med4" | "extra"

    export let projects: ProjectSectionProps["projects"]


    // sort by importance

    let projectsWithGridArea = projects?.map((project) => {
        const projectWithGridArea: {
            project: Project,
            projectGridArea: ProjectGridAreaType
        } = {
            project: project,
            projectGridArea: importanceRankToGridArea(project.importanceRanking)
        }
        return projectWithGridArea;
    })

    // function groupProjectByImportance(projects: Project[]): ProjectImportanceObject {
    //     const importanceObj: ProjectImportanceObject = {
    //         High: [], Medium: [], Low: []
    //     }
    //     projects.forEach(project => {
    //         const projectImportance = project.importance;
    //         importanceObj[projectImportance].push(project)
    //     });
    //     return importanceObj;
    // }

    function importanceRankToGridArea(index: number): ProjectGridAreaType {
        let gridArea: ProjectGridAreaType
             = "extra"
        switch (index) {
            case 1: gridArea = "high1"; break;
            case 2: gridArea = "high2"; break;
            case 3: gridArea = "med1"; break;
            case 4: gridArea = "med2"; break;
            case 5: gridArea = "med3"; break;
            case 6: gridArea = "med4"; break;
            default: gridArea = "extra"
        }
        return gridArea;
    }
</script>

<style lang="scss">
    #projects-section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        background-color: var(--darkT-grey-1);
        margin-top: 48px;
        margin-bottom: 48px;

        display: grid;
        gap: 16px;

        
        grid-template-areas: 
            'high1 high1'
            'high2 high2'
            'med1  med2'
            'med3  med4'
            'extra extra ';

        @media (min-width: 0px) and (max-width: 800px) {
            grid-template-areas: 
            'high1'
            'high2'
            'med1'
            'med2'
            'med3'
            'med4'
            'extra';
        }
    }
</style>


<div id="projects-section">
    {#if projectsWithGridArea}
        {#each projectsWithGridArea as projectWithGridArea}
            <ProjectComponent project={projectWithGridArea.project} projectGridArea={projectWithGridArea.projectGridArea} />
        {/each}
    {/if}
</div>