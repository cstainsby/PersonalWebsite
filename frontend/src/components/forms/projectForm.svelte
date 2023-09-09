<script lang="ts">
    import type { Project, GithubInfo } from "$lib/templates/Project"
    import type { Skill } from "$lib/templates/Skill"

    // function addSkill() {
    //     const skillName = document.getElementById("skillName").value;
    //     if (skillName) {
    //         project.skillsUsed.push({ name: skillName });
    //         document.getElementById("skillName").value = "";
    //     }
    // }
  
    // function removeSkill(index) {
    //     project.skillsUsed.splice(index, 1);
    // }

    let project: Project = {
      name: "",
      shortDescription: "",
      skillsUsed: [],
      award: "",
      description: "",
      screenShotImgPath: "",
      importanceRanking: 0,
      demoLink: "",
      repositoryLink: "",
      posterLink: "",
      readmeLocationSrc: "local",
      githubInfo: {
        repoOwner: "",
        repoName: "",
      },
    };

    function handleSubmit() {
      // You can access the project data here and perform actions like sending it to a server.
      console.log("Project Data:", project);
    }
  </script>
  
<h1>Project Form</h1>
<form on:submit={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={project.name} required />

    <label for="shortDescription">Short Description:</label>
    <textarea id="shortDescription" bind:value={project.shortDescription} required></textarea>

    <!-- You can repeat the following block for multiple skills -->
    <!-- <label for="skillName">Skill Name:</label>
    <input type="text" id="skillName" bind:value={""} />
    <button on:click={() => addSkill()}>Add Skill</button>
    {#each project.skillsUsed as skill, i (skill)}
        <div>
            <span>{skill.name}</span>
            <button on:click={() => removeSkill(i)}>Remove</button>
        </div>
    {/each} -->

    <label for="award">Award (Optional):</label>
    <input type="text" id="award" bind:value={project.award} />

    <label for="description">Description:</label>
    <textarea id="description" bind:value={project.description} required></textarea>

    <label for="screenShotImgPath">Screenshot Image Path (Optional):</label>
    <input type="text" id="screenShotImgPath" bind:value={project.screenShotImgPath} />

    <label for="importanceRanking">Importance Ranking:</label>
    <input type="number" id="importanceRanking" bind:value={project.importanceRanking} required />

    <label for="demoLink">Demo Link (Optional):</label>
    <input type="text" id="demoLink" bind:value={project.demoLink} />

    <label for="repositoryLink">Repository Link (Optional):</label>
    <input type="text" id="repositoryLink" bind:value={project.repositoryLink} />

    <label for="posterLink">Poster Link (Optional):</label>
    <input type="text" id="posterLink" bind:value={project.posterLink} />

    <label for="readmeLocationSrc">Readme Location Source:</label>
    <select id="readmeLocationSrc" bind:value={project.readmeLocationSrc}>
        <option value="local">Local</option>
        <option value="github">GitHub</option>
    </select>

    <!-- {#if project.readmeLocationSrc === "github"}
        <label for="repoOwner">GitHub Repository Owner:</label>
        <input type="text" id="repoOwner" bind:value={project.githubInfo.repoOwner} />

        <label for="repoName">GitHub Repository Name:</label>
        <input type="text" id="repoName" bind:value={project.githubInfo.repoName} />
    {/if} -->

    <button type="submit">Submit</button>
</form>
  