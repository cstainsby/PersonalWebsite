
<script lang="ts">
    import type { Project } from '$lib/templates/Project';
    import type { Skill } from "$lib/templates/Skill";
    import ProjectDetailModal from "./modal/projectDetailModal.svelte";
    import Modal from "./modal/projectDetailModal.svelte";
    import ProjectModal from "./projectModal.svelte";

    import SkillComponent from "./skillSection.svelte";

    interface ProjectProps {
        project: Project 
        projectGridArea: string
    }

    // props 
    export let project: ProjectProps["project"];
    export let projectGridArea: ProjectProps["projectGridArea"]
</script>

<style lang="scss">

    .project {
        display: flex;
        flex-direction: row;
        padding: 24px;
        background-color: var(--darkT-grey-2);
        border-radius: 4px;

        & .project-content {
            display: flex;
            flex-direction: column;

            & .project-info {
                display: flex;
                flex-direction: column;
                align-items: start;
                margin-right: 4px;

                & .award > p {
                    width: fit-content;
                    padding: 2px;
                    background-color: goldenrod;
                    border-radius: 4px;
                    color: var(--darkT-black-2);
                }

                h2 {
                    font-size: 32px;
                    margin: 0px;
                    margin-bottom: 16px;
                }

                ul {
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    padding-left: 0px;
                    flex-wrap: wrap;
            
                    & li {
                        margin-right: 8px;
                        margin-bottom: 8px;
                        border-radius: 4px;
                        padding: 8px;
                        background-color: var(--darkT-black-2);
                        font-weight: bold;
                        color: var(--white);
                    }
                }
            }
        }
    }
    .button-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: fit-content;
        margin-top: auto;
    }

    .project-img {
        align-self: center;
        border-radius: 4px;
        margin-top: 12px;
        margin-bottom: 12px;
        margin-left: 12px;
        width: 100%;
        max-width: 512px;
        height: auto;

        @media (min-width: 0px) and (max-width: 1024px) {
            display: none;
        }
    }
</style>
<!-- {project.importance === "High" 
        ? "high-importance"
        : project.importance === "Medium" 
            ? "medium-importance"
            : "low-importance"}" -->
<div class="project" style='grid-area: {projectGridArea};'>
    <div class="project-content">
        <div class="project-info">
            <!-- project information -->
            <h2>{project.name}</h2>
            <b>{project.shortDescription}</b>
            {#if (project.award)}
                <div class="award">
                    <p><b>Award:</b> {project.award}</p>
                </div>
            {/if}
    
            <!-- skills section -->
            <ul class="skills-used">
                {#each project.skillsUsed as skill }
                    <li>{ skill.name }</li>
                {/each}
            </ul>
            <p>{ project.description }</p>
            
        </div> 
        <!-- buttons -->
        <div class="button-group">
            {#if (project.demoLink)}
                <a class="word-link" href={String(project.demoLink)} target="_blank" rel="noopener noreferrer">
                    Demo</a>
            {/if}
            {#if (project.repositoryLink)}
                <a class="word-link" href={String(project.repositoryLink)} target="_blank" rel="noopener noreferrer">
                    Code</a>
            {/if}
            {#if (project.posterLink)}
                <a class="word-link" href={String(project.posterLink)} target="_blank" rel="noopener noreferrer">
                    Poster</a>
            {/if}
            <ProjectDetailModal 
                buttonText={"Details"} 
                projectName={project.name} 
                readmeSrc={project.readmeLocationSrc}
                githubProjectInfo={project.githubInfo}/>
        </div>
    </div> 
    {#if (project.screenShotImgPath)}
        <img class="project-img" alt="project screenshot" src={project.screenShotImgPath.toString()}/>           
    {/if} 
</div>