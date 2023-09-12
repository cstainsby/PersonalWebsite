import type { Person } from "./Person"

interface Location {
    cityName: string,
    stateName?: string,
    countryName: string
}

type Rejection = "automated email" | "personalized email" | "after interview"

export interface JobApplication {
    companyName: string,
    positionName: string,
    positionId?: string,
    postedOn?: Date,
    appliedOn: Date,
    location: Location[],

    // both responsibilities and requirements will be large strings which contain the descriptions provided in the posting 
    responsibilities?: string,
    requirements?: string,

    // salary will be stored in a low - high range format, if there is only one number posted -> low will === high
    salaryRangeLow?: number,
    salaryRangeHigh?: number,

    referencesUsed: Person[] 

    // describes how user was rejected
    rejected?: Rejection

    // was the full 
    status: "In-Progress" | "Rejected" | "Accepted"

}