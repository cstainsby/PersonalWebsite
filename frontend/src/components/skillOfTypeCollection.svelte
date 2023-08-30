

<script lang="ts">
    import type { Skill } from '$lib/templates/Skill';
    import SkillPortrait from "./skillPortrait.svelte";

    interface SkillOfTypeCollection {
        typeName: String
        skillsOfType: Skill[]
    }

    export let typeName: SkillOfTypeCollection["typeName"]
    export let skillsOfType: SkillOfTypeCollection["skillsOfType"]
</script>

<style lang="scss">
    .skillset-of-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        border-radius: 4px;
        background-color: var(--darkT-black-1);

        & .portrait-section {
            display: flex;
            flex-direction: row;
        }
    }
</style>

{#if skillsOfType.length > 0}
<div class="skillset-of-type">
    <h2>{typeName}</h2>
    <div class="portrait-section">
        {#each skillsOfType as skill}
            <SkillPortrait 
                name={String(skill.name)} 
                imgPath={String(skill.iconPath)}/>
        {/each}
    </div>
</div>
{/if}