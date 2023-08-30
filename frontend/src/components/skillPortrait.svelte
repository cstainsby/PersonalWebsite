

<script lang="ts">
    import { linear } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    interface SkillPortraitProps {
        name: String 
        imgPath: String
    }

    export let name: SkillPortraitProps["name"];
    export let imgPath: SkillPortraitProps["name"];
</script>

<style lang="scss">
    .skill-portrait {
        display: grid;
        grid-template-areas: 
            "skillIconImg"
            "description";
        grid-template-rows: 1fr 0.5fr;
        padding-right: 8px;
        padding-left: 8px;

        img {
            grid-area: skillIconImg;
            justify-self: center;
            max-height: 40px;
            max-width: 40px;
        }
        & p {
            grid-area: description;
            margin-top: 4px;
            text-align: center;
        }
    }
</style>

<div class="skill-portrait" transition:fade={{delay: 0, duration: 1000, easing: linear}}>
    <p>{name}</p>
    <img src={imgPath.toString()} alt="{name} skill image"/>
</div>