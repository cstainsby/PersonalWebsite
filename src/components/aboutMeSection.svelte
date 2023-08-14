<script lang="ts">
    import AboutMeGroupComponent from "./aboutMeGroupComponent.svelte";


    const jobs: {
        title: String,
        employer: String,
        imgPath: String,
        imgAltText: String,
        startDate: Date,
        endDate?: Date
    }[] = [
        {
            title: "Linear Algebra Researcher",
            employer: "Gonzaga University",
            imgPath: "",
            imgAltText: "Petersen Graph",
            startDate: new Date(2022, 1),
            endDate: new Date(2023, 5)
        }
    ]

    const educationAndCredentials: {
        title: String,
        titleCaption?: String,
        fromWho: String,
        imgPath: String,
        imgAltText: String,
        startDate: Date,
        endDate?: Date
    }[] = [
        {
            title: "Computer Science B.S.",
            titleCaption: "With a concentration in Data Science",
            fromWho: "Gonzaga University",
            imgPath: "media/gonzaga.png",
            imgAltText: "gonzaga logo",
            startDate: new Date(2019, 9),
            endDate: new Date(2023, 5)
        },
        {
            title: "AWS Solutions Architect Certification",
            fromWho: "Amazon Web Services",
            imgPath: "media/AWS-solutions-architect-ass.png",
            imgAltText: "aws sol. arch. logo",
            startDate: new Date(2023, 6)
        }
    ]

    const aboutMePersonally: {
        title: String,
        textContent: String,
        imgPath: String,
        imgAltText: String,
    }[] = [
        {
            title: "About me",
            textContent: "I am an entry-level software engineer based in the Greater Seattle Area with a passion for data looking for a full-time programming position that will allow me to provide business impact, solve problems and contribute to a team.",
            imgPath: "media/space-needle.png",
            imgAltText: "space needle icon"
        }
    ]

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
        // background-color: var(--darkT-grey-1);
        margin-left: 12rem;
        margin-right: 12rem;
        display: flex;
        flex-direction: column;
        background-color: var(--darkT-grey-2);
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

    .listed-item {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        // margin-top: 12px;
        margin: 12px;
        padding: 12px;
        border-radius: 4px;
        width: 18rem;

        @media (min-width: 0px) and (max-width: 976px) {
          justify-content: center;
        }

        // space the text from the images slightly
        & .listed-item-text-section {
          // margin-right: 16px;
          width: 65%;
          padding: 24px;

          & p {
            margin-left: 8px;
          }
        }

        & img {
          margin-right: 24px;
          height: 6rem;
        }
    }
</style>

<div id="about-me-section" class="non-greeting-section">
    <h2>A Bit About Me</h2>
    <div id="main-description">
        <p>I am an entry-level software engineer based in the Greater Seattle Area with a passion for data looking for a full-time programming position that will allow me to provide business impact, solve problems and contribute to a team.</p>
        <img src="media/space-needle.png" alt="space needle icon"/>
    </div>
    
    <!-- <div id="about-me-personal">
        <h2>A Bit About Me</h2>
        {#each aboutMePersonally as personalItem}
            <div class="listed-item">
                <div>
                    <h3>{personalItem.title}</h3>
                    <p>{personalItem.textContent}</p>
                </div>
                <img src={String(personalItem.imgPath)} alt={String(personalItem.imgAltText)}/>
            </div>
        {/each}
    </div> -->

    <div id="about-me-education-and-credentials">
        <h2>Education/Credentials</h2>

        {#each educationAndCredentials as edOrCred}
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
        {/each}
    </div>

    <div id="about-me-work">
        
    </div>

      <div id="about-me-work">
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
    </div>
</div>