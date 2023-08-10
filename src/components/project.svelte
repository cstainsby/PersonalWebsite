
<script lang="ts">
    import type Project from "../templates/Project";
    import type Skill from "../templates/Skill";
    import ProjectModal from "./projectModal.svelte";

    import SkillComponent from "./skillSection.svelte";

    interface ProjectProps {
        project: Project 
        projectIndex: number
    }

    // props 
    export let project: ProjectProps["project"];
    export let projectIndex: ProjectProps["projectIndex"];

    let showModal: boolean = false;
    console.log("showModal val " + showModal);
    
</script>

<style lang="scss">
    .high-importance {
        max-width: 100%;
    }
    .medium-importance {
        max-width: 40%;
    }

    .project {
        position: relative;
        padding: 24px;
        margin-bottom: 48px;
        margin-right: 24px;
        background-color: var(--darkT-grey-2);
        border-radius: 4px;
        border: 2px solid var(--blue);

        & .project-content {
            display: flex;
            flex-direction: column;
            // margin-bottom: 48px;
            height:auto;

            @media (min-width: 1024px) {
                /* For screens larger than 768px, have two columns */
                flex-direction: row;
            }

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

            & .project-img {
                align-self: center;
                border-radius: 4px;
                margin-top: 12px;
                width: 100%;
                max-width: 512px;
                height: auto;
            }
        }

        & .button-group {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: fit-content;
            // position: absolute;
            // bottom: 24px;
            // make sure there is some margin between the buttons
            & > * {
                margin-right: 8px;
            }
        }
    }
</style>

<div class="project 
    {project.importance === "High" 
        ? "high-importance"
        : project.importance === "Medium" 
            ? "medium-importance"
            : "low-importance"}"
>
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
                {#each project.skillsUsed as skill, skillIndex }
                    <li>{ skill.name }</li>
                {/each}
            </ul>
            <p>{ project.description }</p>
            
        </div> 
        {#if (project.screenShotImgPath)}
            <img class="project-img" alt="project screenshot" src={project.screenShotImgPath.toString()}/>           
        {/if} 
    </div> 

    <!-- buttons -->
    <div class="button-group">
        {#if (project.demoLink)}
            <a class="word-link" href={String(project.demoLink)} target="_blank" rel="noopener noreferrer">
                Demo</a>
        {/if}
        {#if (project.details)}
            <a id="BioPathprojDescBtn" class=" open-modal-button word-link">Details</a>
        {/if}
        {#if (project.repositoryLink)}
            <a class="word-link" href={String(project.repositoryLink)} target="_blank" rel="noopener noreferrer">
                Code</a>
        {/if}
        {#if (project.posterLink)}
            <a class="word-link" href={String(project.posterLink)} target="_blank" rel="noopener noreferrer">
                Poster</a>
        {/if}

        <!-- modal -->
        <button on:click={() => (showModal = true)} class="open-modal-button word-link">Details</button>
        <ProjectModal {project} {projectIndex}/>
    </div>
</div>