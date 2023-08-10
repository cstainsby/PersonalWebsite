import type Skill from "./Skill"
import type Stack from "./Stack"

interface ProjectDetails {
    aboutTheProject: String
    stacksUsed?: Stack[]
}

export default interface Project {
    name: String
    shortDescription: String
    skillsUsed: Skill[]
    award?: String 
    description: String
    screenShotImgPath?: String
    importance: "High" | "Medium" | "Low"

    // links
    demoLink?: String
    repositoryLink?: String
    posterLink?: String

    details?: ProjectDetails
}