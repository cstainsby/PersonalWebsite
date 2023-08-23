import type Skill from "./Skill"
import type Stack from "./Stack"


export default interface Project {
    name: string
    shortDescription: string
    skillsUsed: Skill[]
    award?: string 
    description: string
    screenShotImgPath?: string
    importanceRanking: number

    // links
    demoLink?: string
    repositoryLink?: string
    posterLink?: string

    customReadme?: string 
}