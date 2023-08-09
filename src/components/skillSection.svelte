<script lang="ts">
    import type Skill from "../templates/Skill"
    import SkillOfTypeCollection from "./skillOfTypeCollection.svelte";

    // interface for typifying expected raw data
    interface SkillList {
        skillType: String
        skillsAssociated: String[]
    }

    const skillList: SkillList = [
        {
            skillType: "Languages",
            skillsAssociated: [
                "python",
                "java",
                "mysql",
                "javascript"
            ]
        },
        {
            skillType: "Frontend",
            skillsAssociated: [
                "react",
                "html",
                "css"
            ]
        },
        {
            skillType: "Backend",
            skillsAssociated: [
                "Flask",
                "django",
                "node.js"
            ]
        },
        {
            skillType: "Data Science",
            skillsAssociated: [
                "jupyter",
                "pandas",
                "numpy",
                "sklearn"
            ]
        },
        {
            skillType: "Tools and Platform",
            skillsAssociated: [
                "docker",
                "aws",
                "github",
                "linux"
            ]
        },
        {
            skillType: "Dev. Practices",
            skillsAssociated: [
                "agile",
                "cicd"
            ]
        }
    ]
</script>

<style lang="scss">
    #skills-section {
        display: flex;
        justify-content: center;
        align-items: center;

        & .section-title {
            font-size: 36px;
        }

        & .section-content {
            display: grid;
            grid-template-areas: auto;
            grid-template-columns: repeat(1, 1fr);
            gap: 8px;
            column-gap: 16px;
            margin: 0 auto;
            max-width: 1200px;


            @media (min-width: 768px) {
            /* For screens larger than 768px, have two columns */
            grid-template-columns: repeat(2, 1fr);
            }
            
            @media (min-width: 1024px) {
            /* For screens larger than 1024px, have three columns */
            grid-template-columns: repeat(3, 1fr);
            }
        }
    }
</style>

<section id="skills-section">
    <h2 class="section-title">Skills</h2>
    <div id="skills-section-content" class="section-content">
        {#each skillList as skillCollection}
            <SkillOfTypeCollection typeName={skillCollection.}/>
        {/each}
    </div>
</section>