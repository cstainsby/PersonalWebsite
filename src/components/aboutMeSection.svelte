<script lang="ts">
    import AboutMeGroupComponent from "./aboutMeGroupComponent.svelte";

    import type Job from "../templates/Job";
    import type Achievement from "../templates/Achievement";
    import type PersonalBlurb from "../templates/PersonalBlurb";


    interface AboutMeSectionProps {
        jobs: Job[]
        achievements: Achievement[]
        personalBlurbs: PersonalBlurb[]
    }

    export let jobs: AboutMeSectionProps["jobs"]
    export let educationAndCredentials: AboutMeSectionProps["achievements"]
    export let aboutMePersonally: AboutMeSectionProps["personalBlurbs"]

    function convertDateToDisplayDateString(date: Date) {
        let dateString = "";
        
        if (date) {
            const dateStringList = date.toDateString().split(" ");

            if (dateStringList.length === 4) {
                // toDateString() should return "Day Month DayInMonth Year"
                const month = dateStringList[1]
                const year = dateStringList[3]
                dateString += month;

                // add period indicating contraction if month word length greater than 4
                if (month.toLowerCase() !== "may" || 
                    month.toLowerCase() !== "june" || 
                    month.toLowerCase() !== "july") {
                        dateString += ".";
                }
                dateString += (" " + year);
            }
        }
        return dateString;
    }
</script>


<style lang="scss">
    #about-me-section {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: 6%;
        margin-right: 6%;
        padding: 24px;
        justify-content: center;

        background-color: var(--darkT-grey-2);
        border-radius: 4px;
        border: 2px solid var(--darkT-black-2);
    }
    #about-me-personal {
        
        & p {
            font-size: large;
        }
    }

    #main-description {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        & img {
            height: 8rem;
            width: 8rem; 
        }
    }
</style>

<div id="about-me-section" class="non-greeting-section">
    <div id="about-me-personal">
        <h1>A Bit About Me</h1>
        <p>I am an entry-level software engineer based in the Greater Seattle Area with a passion for data looking for a full-time programming position that will allow me to provide business impact, solve problems and contribute to a team.</p>
        <!-- <img src="media/space-needle.png" alt="space needle icon"/> -->

        <div class="list-container">
            {#each aboutMePersonally as personalItem, personalItemIndex}
                <div class="listed-item">
                    <div>
                        <h3>{personalItem.title}</h3>
                        <p>{personalItem.textContent}</p>
                    </div>
                    <img src={String(personalItem.imgPath)} alt={String(personalItem.imgAltText)}/>
                </div>
                {#if personalItemIndex < aboutMePersonally.length - 1}
                    <div class="vertical-border"></div>
                {/if}
            {/each}
        </div>
    </div>

    <div id="about-me-education-and-credentials">
        <h2>Education/Credentials</h2>
        <div class="list-container">
            {#each educationAndCredentials as edOrCred, edOrCredIndex}
                <div class="listed-item">
                    <div>
                        <h3>{edOrCred.title}</h3>
                        {#if edOrCred.titleCaption}
                            <p>{edOrCred.titleCaption}</p>
                        {/if}
                        <p>{edOrCred.fromWho}</p>
                        <p>
                            {convertDateToDisplayDateString(edOrCred.startDate)} - 
                            {#if edOrCred.endDate}
                                {convertDateToDisplayDateString(edOrCred.endDate)}
                            {:else}
                                In Progress
                            {/if}
                        </p>
                    </div>
                    <img src={String(edOrCred.imgPath)} alt={String(edOrCred.imgAltText)}/>
                </div>
                {#if edOrCredIndex < educationAndCredentials.length - 1}
                    <div class="vertical-border"></div>
                {/if}
            {/each}
        </div>
    </div>

    <div id="about-me-work">
        <h2>Work History</h2>
        <div class="list-container">
            {#each jobs as job}
                <div class="listed-item">
                    <div class="listed-item-text">
                        <h3>{job.title}</h3>
                        <p>{job.employer}</p>
                        <p>
                            {convertDateToDisplayDateString(job.startDate)} - 
                            {#if job.endDate}
                                {convertDateToDisplayDateString(job.endDate)}
                            {:else}
                                In Progress
                            {/if}
                        </p>
                    </div>
                    <img src={String(job.imgPath)} alt={String(job.imgAltText)}/>
                </div>
            {/each}
        </div>
    </div>

      <!-- <div id="about-me-work">
        <div class="row-section">
          <h2>Work</h2>
          <div class="listed-item">
            <div class="listed-item-text-section">
              <h3>Linear Algebra Researcher</h3>
              <p>Gonzaga University</p>
              <p>Jan. 2022 - May 2023</p>
              <a id="MathResearchBtn" class="button open-modal-button word-link">Details</a>
              <dialog id="MathResearchModal" class="modal">
                <div class="proj-dialog-header">
                  <h1>Math Research</h1>
                  <a class="close-modal-button image-link" href="#">
                    <img src="media/close.png" alt="close" height="20">
                  </a>
                </div>
                <hr>
                <div class="proj-dialog-body">
                  <div class="dialog-body-text">
                    <h3 class="dialog-body-section-header">About The Group</h3>
                    <p>
                      In this paid research position, I work with two professors and a five-person team to create proofs and solve problems that are important to the larger math community. Our work has included finding proofs to show a relation between upper triangle square root matrices and “Cholesky root” matrices over a field of two, as well as finding how Kneser graphs total roman domination number behave over a range of sizes.
                    </p>
                    <hr/>
                    <div class="dialog-body-diagram-section">
                      <h3 class="dialog-body-section-header">Cholesky</h3>
                      <p>I created a script to help my linear algebra research group quickly find matrices of nxn size over a specified field. It uses recursive tree generation and branch pruning to find all possible paths to any given upper triangle square root matrix or “Cholesky root” matrix. 
                        <b>Follow link on the right for the code.</b>
                      </p>
                    </div>
                    <div class="dialog-body-diagram-section">
                      <h3 class="dialog-body-section-header">Total Roman Domination</h3>
                      <p>My team worked on and presented our work on finding either exact values for or bounds of varying Knesser Graphs.
                        <b>More information about our work can be found through the T.R.D. link</b>
                      </p>
                    </div>
                  </div>
                  <div class="project-links">
                    <a class="word-link" href="https://github.com/cstainsby/CholeskyRootsOverF2" target="_blank" rel="noopener noreferrer">
                      Cholesky Code</a>
                    <a class="word-link" href="https://github.com/cstainsby/MathResearchPosters" target="_blank" rel="noopener noreferrer">
                      T.R.D. Poster</a>
                  </div>
                </div>
              </dialog>
            </div>
            <img src="media/Math-research-screenshot.png" alt="research screenshot" height="100px">
          </div>
        </div>
    </div> -->
</div>