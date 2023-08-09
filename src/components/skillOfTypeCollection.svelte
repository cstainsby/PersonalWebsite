

<script lang="ts">
    import type Skill from "../templates/Skill";
    import SkillPortrait from "./skillPortrait.svelte";

    interface SkillOfTypeCollection {
        typeName: String
        skillsOfType: Skill[]
    }

    export let typeName: SkillOfTypeCollection["typeName"]
    export let skillsOfType: SkillOfTypeCollection["skillsOfType"]
</script>

<style lang="scss">
    & .skillset-of-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        border-radius: 4px;
        background-color: var(--darkT-grey-2);
        border: 2px solid var(--blue);

        & img {
            max-height: 40px;
            max-width: 40px;
        }

        & .icon-section {
            display: flex;
            flex-direction: row;
        }
    }
</style>

<div class="skillset-of-type">
    <h1>{typeName}</h1>
    {#each skillsOfType as skill}
        <SkillPortrait name={String(skill.name)} imgPath={String(skill.iconPath)}/>
    {/each}
</div>