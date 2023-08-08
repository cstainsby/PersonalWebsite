import { Skill } from "./templates/Skill"
import { Project } from "./components/"

const sampleSkills: Skill[] = [
    {name: "Javascipt"},
    {name: "React"},
    {name: "Bootstrap"},
    {name: "AWS"},
    {name: "Docker"},
    {name: "PostgreSQL"},
    {name: "Python"}, 
    {name: "Django"},
    {name: "REST API"}
]

const sampleProjects: Project[] = [
    {
        projectName: "BioPath",
        shortDescription: "Senior Capstone Project",
        award: "2023 Best Computer Science Project",
        description: "My small team partnered with the Gonzaga University Biochemistry department to create a web app which aids students in learning Biochemical pathways.",
        skillsUsed: sampleSkills
    }
]

export default {
    sampleProjects,
    sampleSkills
}