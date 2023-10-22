export interface Database {
    public: {
        Tables: {
            jobApplication: {
                Row: {
                    id: number,
                    applicantId: string,
                    companyName: string,
                    positionName: string,
                    positionId?: string,
                    postedOn?: Date,
                    appliedOn: Date,
                    primaryLocation: string,
                    secondaryLocation?: string,
                    salaryRangeLow?: number,
                    salaryRangeHigh?: number,
                    yearsOfExpirienceMinimumSuggested: number,
                    employmentType: "fullTime" | "partTime",
                    contract: boolean
                }
            },
            jobApplicationProgress: {
                Row: {
                    initialResponseRecieved: boolean,
                    numIntervi
                    offerMade: boolean,
                    offerTaken: boolean
                }
            }
        }
    }
}