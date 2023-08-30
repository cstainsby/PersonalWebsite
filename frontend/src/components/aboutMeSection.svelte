<script lang="ts">
    import type Job from "../templates/Job";
    import type PersonalBlurb from "../templates/PersonalBlurb";
    import type Education from "../templates/Education";

    import { yearMonthFormatToDate, convertDateToMonthYearDateDisplayStr } from "$lib/dates"

    // import function to register Swiper custom elements
    // import { register } from 'swiper/element/bundle';
    // // register Swiper custom elements
    // register();

    interface AboutMeSectionProps {
        jobs?: Job[]
        education?: Education[]
        personalBlurbs?: PersonalBlurb[]
    }

    export let jobs: AboutMeSectionProps["jobs"]
    export let education: AboutMeSectionProps["education"]
    export let personalBlurbs: AboutMeSectionProps["personalBlurbs"]
</script>


<style lang="scss">
    #about-me-section {
        display: flex;
        flex-direction: column;
        margin-bottom: 80px;
        padding: 24px;
        justify-content: center;

        background-color: var(--darkT-grey-2);
        border-radius: 4px;
    }
    #about-me-personal {
        
        & p {
            font-size: large;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 16px;

        & > img {
            width: 40px;
            height: 40px;
            margin-right: 12px;
        }

        & > h2 {
            margin-bottom: 0px;
            margin-top: 0px;
        }
    }

    .list-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        // justify-content: space-evenly;

        @media (min-width: 0px) and (max-width: 800px) {
            flex-direction: column;
        }
    }

    .vertical-border {
        @media (min-width: 0px) and (max-width: 800px) {
            border-bottom: 2px solid var(--darkT-black-2);
            width: 180px;
        }
        @media (min-width: 800px) {
            border-left: 2px solid var(--darkT-black-2);
            height: 90px;
        }
    }


    .listed-content-block {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        // padding: 12px;
        width: fit-content;
        // border: 2px solid var(--darkT-black-2);
        // background-color: var(--darkT-black-1);
        border-radius: 4px;
        min-height: 200px;
        height: auto;
        width: 30%;

        & > div > p {
            font-size: smaller;
            margin-left: 8px;
        }

        & img {
            margin-left: 12px;
            height: 5rem;
        }
    }

    .listed-transition-item {
        border-radius: 50%;
        padding: 8px;
        background-color: var(--blue);
    }

    .listed-item {
        margin-right: 24px;

        @media (min-width: 0px) and (max-width: 800px) {
            justify-content: center;
        }

    }
</style>

<div id="about-me-section" class="non-greeting-section">
    <div id="about-me-personal">
        <h1>A Bit About Me</h1>
        <p>I am an entry-level software engineer based in the Greater Seattle Area with a passion for data looking for a full-time programming position that will allow me to provide business impact, solve problems and contribute to a team.</p>
        <!-- <img src="media/space-needle.png" alt="space needle icon"/> -->

        {#if personalBlurbs }
            <div class="list-container">
                {#each personalBlurbs as personalItem, personalItemIndex}
                    <div class="listed-item">
                        <div>
                            <h3>{personalItem.title}</h3>
                            <p>{personalItem.textContent}</p>
                        </div>
                        <img src={String(personalItem.imgPath)} alt={String(personalItem.imgAltText)}/>
                    </div>
                    {#if personalItemIndex < personalBlurbs.length - 1}
                        <!-- <div class="vertical-border"></div> -->
                        <div class="listed-item listed-transition-item">&&</div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>

    {#if education}
        <div id="about-me-education-and-credentials">
            <div class="header">
                <img src="../../media/education.png" alt="education icon"/>
                <h2>Education/Credentials</h2>
            </div>
            <div class="list-container">
                {#each education as educationItem, educationItemIndex}
                    <div class="listed-item listed-content-block">
                        <div>
                            <h3>{educationItem.title}</h3>
                            {#if educationItem.titleCaption}
                                <p>{educationItem.titleCaption}</p>
                            {/if}
                            <p>Through: {educationItem.fromWho}</p>
                            <p>
                                {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(educationItem.startDate))} - 
                                {#if educationItem.endDate}
                                    {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(educationItem.endDate))}
                                {:else}
                                    In Progress
                                {/if}
                            </p>
                        </div>
                        <img src={String(educationItem.imgPath)} alt={String(educationItem.imgAltText)}/>
                    </div>
                    {#if educationItemIndex < education.length - 1}
                        <!-- <div class="vertical-border"></div> -->
                        <div class="listed-item vertical-border"></div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

    {#if jobs}
        <div id="about-me-work">
            <div class="header">
                <img src="../../media/suitcase.png" alt="work icon"/>
                <h2>Work History</h2>
            </div>
            <div class="list-container">
                {#each jobs as job, jobIndex}
                    <div class="listed-item listed-content-block">
                        <div class="listed-item-text">
                            <h3>{job.title}</h3>
                            {#if job.employer}
                                <p>Employer: {job.employer}</p>
                            {/if}
                            <p>
                                {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(job.startDate))} - 
                                {#if job.endDate}
                                    {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(job.endDate))}
                                {:else}
                                    In Progress
                                {/if}
                            </p>
                        </div>
                        <img src={String(job.imgPath)} alt={String(job.imgAltText)}/>
                    </div>
                    {#if jobIndex < jobs.length - 1}
                        <div class="vertical-border"></div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

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