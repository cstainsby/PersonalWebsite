import type { Project } from "./Project";
import type { Person } from "./Person"


type Salary = { amount: number } 
    | {
        rangeLow: number,
        rangeHigh: number
    }

export interface Location {
    cityName: string,
    stateName?: string,
    address?: string,
    countryName: string
}


export interface JobApplication { 
    companyName: string,
    positionName: string,
    positionId?: string,
    postedOn?: Date,
    appliedOn: Date,
    locations: Location[],

    // both responsibilities and requirements will be large strings which contain the descriptions provided in the posting 
    responsibilities?: string,
    requirements?: string,

    // salary will be stored in a low - high range format, if there is only one number posted -> low will === high
    salary?: Salary,

    referencesUsed: Person[],
    yearsOfExpirienceRequired: number,

    // describes how user was rejected
    rejected?: "automated email" | "personalized email" | "after interview",

    // was the full 
    status: "In-Progress" | "Rejected" | "Accepted" | "Took Job"

}

export interface Job {
    title: string,
    employer: string,
    jobDescription?: string,
    imgPath: string,
    imgAltText: string,
    startDate?: string,
    endDate?: string,

    salary: Salary,

    sampleProjects?: Project[]

}