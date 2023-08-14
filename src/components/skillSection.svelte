<script lang="ts">
    import type Skill from "../templates/Skill"
    import SkillOfTypeCollection from "./skillOfTypeCollection.svelte";

    // interface for typifying expected raw data
    interface SkillAndTypeList {
        skillType: String
        skillsAssociated: Skill[]
    }

    const skillAndTypeList: SkillAndTypeList[] = [
        {
            skillType: "Languages",
            skillsAssociated: [
                {
                    name: "Python",
                    iconPath: "../../media/python.png"
                },
                {
                    name: "Java",
                    iconPath: "../../media/java.png"
                },
                {
                    name: "MySQL",
                    iconPath: "../../media/mysql.png"
                },
                {
                    name: "Javascript",
                    iconPath: "../../media/javascript.png"
                }
            ]
        },
        {
            skillType: "Frontend",
            skillsAssociated: [
                {
                    name: "React",
                    iconPath: "../../media/react.png"
                },
                {
                    name: "HTML",
                    iconPath: "../../media/html.png"
                },
                {
                    name: "CSS",
                    iconPath: "../../media/css.png"
                }
            ]
        },
        {
            skillType: "Backend",
            skillsAssociated: [
                {
                    name: "Flask",
                    iconPath: "../../media/flask.png"
                },
                {
                    name: "Django",
                    iconPath: "../../media/django.png"
                },
                {
                    name: "Node.js",
                    iconPath: "../../media/node.js.png"
                }
            ]
        },
        {
            skillType: "Data Science",
            skillsAssociated: [
                {
                    name: "Jupyter",
                    iconPath: "../../media/jupyter.png"
                },
                {
                    name: "Pandas",
                    iconPath: "../../media/pandas.png"
                },
                {
                    name: "Numpy",
                    iconPath: "../../media/numpy.png"
                },
                {
                    name: "SKLearn",
                    iconPath: "../../media/sklearn.png"
                }
            ]
        },
        {
            skillType: "Tools and Platform",
            skillsAssociated: [
                {
                    name: "Docker",
                    iconPath: "../../media/docker.png"
                },
                {
                    name: "AWS",
                    iconPath: "../../media/aws.png"
                },
                {
                    name: "Github",
                    iconPath: "../../media/github.png"
                },
                {
                    name: "Linux",
                    iconPath: "../../media/linux.png"
                }
            ]
        },
        {
            skillType: "Dev. Practices",
            skillsAssociated: [
                {
                    name: "Agile",
                    iconPath: "../../media/agile.png"
                },
                {
                    name: "CI/CD",
                    iconPath: "../../media/cicd.png"
                }
            ]
        }
    ]
</script>

<style lang="scss">
    #skills-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--darkT-grey-1);
        margin-top: 24px;
        padding-bottom: 24px;
        padding-left: 6%;
        padding-right: 6%;

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

<div id="skills-section">
    <h2 class="section-title">Skills</h2>
    <div id="skills-section-content" class="section-content">
        {#each skillAndTypeList as skillCollection}
            <SkillOfTypeCollection typeName={String(skillCollection.skillType)} skillsOfType={skillCollection.skillsAssociated}/>
        {/each}
    </div>
</div>