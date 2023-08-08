import type Skill from "./Skill"
import type Stack from "./Stack"

interface ProjectDetails {
    aboutTheProject: String
    repositoryLink?: String
    demoLink?: String
    posterLink?: String

    stacksUsed?: Stack[]
}

export default interface Project {
    name: String
    shortDescription: String
    skillsUsed: Skill[]
    award?: String 
    description: String
    screenShotImgPath?: String

    details?: ProjectDetails
}