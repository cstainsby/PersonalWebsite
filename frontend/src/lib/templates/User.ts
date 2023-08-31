export interface User {
    firstName: string
    lastName: string
    phoneNumber: string 
    email: string

    resume: {
        link: string
    }

    accounts: [
        {
            serviceName: string
            username: string
            link: string
        }
    ]
}