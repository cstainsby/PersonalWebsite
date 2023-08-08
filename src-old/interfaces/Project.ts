import Skill from "./Skill"

interface Stack {
    stackType: "Frontend" | "Backend" | "Data Science" | "Cloud" | "Other"

    stackDiagram?: String
}

interface ProjectDetails {
    aboutTheProject: String
    repositoryLink?: String
    demoLink?: String
    posterLink?: String

    stacksUsed?: Stack[]
}

export default interface Project {
    projectName: String
    shortDescription: String
    skillsUsed: Skill[]
    award?: String 
    description: String

    details?: ProjectDetails
}