
import type { Education } from "./Education"
import type { Job } from "./Job"
import type { PersonalBlurb } from "./PersonalBlurb"
import type { Project } from "./Project"
import type { Skill, SkillCollection } from "./Skill"
import type { User } from "./User"
import type { ImageLink } from "./ImageLink"

/** WebsiteData
 *      An interface which defines the structure of a the data which goes into a website
 */
export interface WebsiteData {
    websiteName: string
    title: string
    extraDescriptor: string
    ownedByUserID: string,

    user: User
    settings: WebsiteSettings
    professionalLinks: ImageLink[]

    projects: Project[]
    skills: SkillCollection[]

    jobs: Job[]
    education: Education[]
    personalBlurbs: PersonalBlurb[]
}

/** WebsiteSettings
 *      defines the settings data which the website creator sets 
 */
interface WebsiteSettings {

}