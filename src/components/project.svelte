
<script lang="ts">
    import type Project from "../templates/Project";
    import type Skill from "../templates/Skill";
    import ProjectModal from "./projectModal.svelte";

    import SkillComponent from "./skill.svelte";

    interface ProjectProps {
        project: Project 
        projectIndex: number
    }

    // props 
    export let project: ProjectProps["project"];
    export let projectIndex: ProjectProps["projectIndex"];
</script>

<style lang="scss">
    .project {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 24px;
        margin-bottom: 48px;
        background-color: var(--darkT-grey-2);
        border-radius: 4px;
        border: 2px solid var(--blue);

        @media (min-width: 1024px) {
        /* For screens larger than 768px, have two columns */
        flex-direction: row;
        }

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

        & .project-info {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-right: 16px;

        & .button-group {
            display: flex;
            flex-direction: row;

            & > * {
            margin-right: 8px;
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
</style>

<div class="project">
    <div class="project-info">
        <!-- project information -->
        <h2>{project.name}</h2>
        <b>{project.shortDescription}</b>
        {#if (project.award)}
            <div class="award">
                <p><b>Award:</b> 2023 Best Computer Science Project</p>
            </div>
        {/if}

        <!-- skills section -->
        <ul class="skills-used">
            {#each project.skillsUsed as skill, skillIndex }
                <li>{ skill.name }</li>
            {/each}
        </ul>
        <p>{ project.description }</p>
        
        <!-- buttons -->
        <div class="button-group">
        <a class="word-link" href="https://ifdfgjpy82.us-west-2.awsapprunner.com" target="_blank" rel="noopener noreferrer">
            Demo</a>
        <a id="BioPathprojDescBtn" class=" open-modal-button word-link">Details</a>
        </div>
        
        <!-- modal -->
        <ProjectModal />
    </div>
    {#if (project.screenShotImgPath)}
        <img class="project-img" src={project.screenShotImgPath}/>           
    {/if}   
</div>