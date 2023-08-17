

import type Education from "../templates/Education"
import type Job from "../templates/Job"
import type PersonalBlurb from "../templates/PersonalBlurb"
import type Project from "../templates/Project"
import type Skill from "../templates/Skill"

/** WebsiteData
 *      An interface which defines the structure of a the data which goes into a website
 */
interface WebsiteData {
    websiteName: string
    title: string
    extraDescriptor: string

    user: User
    settings: WebsiteSettings
    professionalLinks: ImageLink[]

    projects: Project[]
    skills: Skill[]

    jobs: Job[]
    education: Education[]
    personalBlurbs: PersonalBlurb[]
}

/** WebsiteSettings
 *      defines the settings data which the website creator sets 
 */
interface WebsiteSettings {

}

interface User {
    firstName: string
    lastName: string
    phoneNumber: string 
    email: string
}

/** ImageLink   
 *      contains the data for a link which is an image 
 */
interface ImageLink {
    title: string
    imgPath: string
    altText: string
    href: string
}

export type {
    WebsiteData,
    WebsiteSettings,
    User,
    ImageLink,
}