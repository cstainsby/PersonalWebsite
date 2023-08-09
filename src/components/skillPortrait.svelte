

<script lang="ts">

    interface SkillPortraitProps {
        name: String 
        imgPath: String
    }

    export let name: SkillPortraitProps["name"];
    export let imgPath: SkillPortraitProps["name"];
</script>

<style lang="scss">
    & .skill-icon-element {
        display: grid;
        grid-template-areas: 
            "skillIconImg"
            "description";
        grid-template-rows: 1fr 0.5fr;
        padding-right: 8px;
        padding-left: 8px;

        & img {
            grid-area: skillIconImg;
            justify-self: center;
        }
        & p {
            grid-area: description;
            margin-top: 4px;
            text-align: center;
        }
    }
</style>

<div class="skill-portrait">
    <p>{name}</p>
    <img src={imgPath.toString()} alt="skill image"/>
</div>