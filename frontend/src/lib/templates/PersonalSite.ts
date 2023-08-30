
import type { Education } from "./Education"
import type { Job } from "./Job"
import type { PersonalBlurb } from "./PersonalBlurb"
import type { Project } from "./Project"
import type { Skill } from "./Skill"
import type { User } from "./User"

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