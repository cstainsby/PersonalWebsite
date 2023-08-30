<script lang="ts">
    import type { Skill } from '$lib/templates/Skill'
    import SkillOfTypeCollection from "./skillOfTypeCollection.svelte";

    interface SkillSectionProps {
        skillCollections: SkillCollection[]
    }

    // interface for typifying expected raw data
    interface SkillCollection {
        skillType: String
        skillsAssociated: Skill[]
    }

    export let skillCollections: SkillSectionProps["skillCollections"];
</script>

<style lang="scss">
    #skills-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--darkT-grey-2);
        border-radius: 4px;
        margin-bottom: 48px;
        padding: 24px;
        padding-bottom: 48px;

        & .section-title {
            font-size: 36px;
        }

        & .section-content {
            display: grid;
            grid-template-areas: auto;
            grid-template-columns: repeat(1, 1fr);
            gap: 8px;
            column-gap: 16px;
            margin: 0 auto;
            max-width: 1200px;


            @media (min-width: 768px) {
            /* For screens larger than 768px, have two columns */
                grid-template-columns: repeat(2, 1fr);
            }
            
            @media (min-width: 1024px) {
            /* For screens larger than 1024px, have three columns */
                grid-template-columns: repeat(3, 1fr);
            }
        }
    }
</style>

<div id="skills-section">
    {#if skillCollections}
        <h2 class="section-title">Technical Skills</h2>
        <div id="skills-section-content" class="section-content">
            {#each skillCollections as skillCollection}
                <SkillOfTypeCollection typeName={String(skillCollection.skillType)} skillsOfType={skillCollection.skillsAssociated}/>
            {/each}
        </div>
    {/if}
</div>