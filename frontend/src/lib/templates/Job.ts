import type { Project } from "./Project";


export interface Job {
    title: string,
    employer: string,
    jobDescription?: string,
    imgPath: string,
    imgAltText: string,
    startDate: string,
    endDate?: string,

    sampleProjects?: Project[]

}