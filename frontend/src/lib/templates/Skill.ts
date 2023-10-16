
export interface Skill {
    name: String
    iconPath?: String
}

export interface SkillCollection {
    skillType: String
    skillsAssociated: Skill[]
}