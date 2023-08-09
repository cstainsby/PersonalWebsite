<script lang="ts">
    // interfaces
    import type Project from "../templates/Project";
    import type Skill from "../templates/Skill";

    // projects
    import ProjectComponent from "./project.svelte";

    const biopathSkills: Skill[] = [
        {name: "Javascript"},
        {name: "React"},
        {name: "Bootstrap"},
        {name: "AWS"},
        {name: "Docker"},
        {name: "PostgreSQL"},
        {name: "Python"}, 
        {name: "Django"},
        {name: "REST API"}
    ]
    const aitaSkills: Skill[] = [
        {name: "Python"},
        {name: "ML Data Structures"},
        {name: "Docker"},
        {name: "GCP BigQuery"},
        {name: "GCP CloudRun"},
        {name: "Flask"},
        {name: "HuggingFace"},
        {name: "Jupyter Notebooks"}
    ]
    const personalWebsiteSkills: Skill[] = [
        {name: "Typescript"},
        {name: "AWS EC2"},
        {name: "Svelte"},
        {name: "HTML"},
        {name: "SCSS"},
        {name: "NGINX"}
    ]
    const hockeyDataProject: Skill[] = [
        {name: "Python"},
        {name: "ML Data Structures"},
        {name: "Jupyter Notebooks"},
        {name: "EDA"}
    ]

    const sampleProjects: Project[] = [
        {
            name: "BioPath",
            shortDescription: "Senior Capstone Project",
            award: "Gonzaga SEAS 2023 Best Computer Science Project",
            description: "My small team partnered with the Gonzaga University Biochemistry department to create a web app which aids students in learning Biochemical pathways.",
            screenShotImgPath: "../../media/biopath-screenshot.png",
            demoLink: "https://ifdfgjpy82.us-west-2.awsapprunner.com",
            posterLink: "https://github.com/cstainsby/BiopathPoster",
            repositoryLink: "https://github.com/SD-2022-CPSC-10/BioPath",
            skillsUsed: biopathSkills
        },
        {
            name: "Reddit r/AITA NLP Sentiment Classifier",
            shortDescription: "Personal Project",
            description: "An app which leverages a HuggingFace BERT multiclass classifier to judge reddit posts from the popular r/AmITheAsshole subreddit according to their defined classification rules.",
            screenShotImgPath: "../../media/AITA-screenshot.png",
            demoLink: "https://backend-model-service-zkidffnq6a-uc.a.run.app/models/AITAclassmodel",
            repositoryLink: "https://github.com/cstainsby/B-Onion",
            skillsUsed: aitaSkills
        },
        {
            name: "Personal Website",
            shortDescription: "This Website",
            description: "A website which shows off every",
            repositoryLink: "https://github.com/cstainsby/PersonalWebsite",
            skillsUsed: personalWebsiteSkills
        },
        {
            name: "Hockey Data Project",
            shortDescription: "Class Project",
            description: "In a team of three members, we used Kaggle and NHL data for exploratory data analysis in conjunction with self-made and self-trained machine learning models (decision trees, random forests, KNN, and Naïve Bayes) to predict which NHL teams would make the playoffs (classification).",
            repositoryLink: "https://github.com/cstainsby/HockeyDataProject",
            skillsUsed: hockeyDataProject
        }
    ]
</script>


<div id="ProjectSection">
    {#each sampleProjects as project, projectIndex}
        <ProjectComponent {project} {projectIndex}/>
    {/each}

    <!-- AITA Project -->
    <!-- <div class="project">
      <div class="project-info">
        <h2>Reddit r/AITA NLP Sentiment Classifier</h2>
        <b>Personal Project</b>
        <ul class="skills-used">
          <li>Python</li>
          <li>ML Data Structures</li>
          <li>Docker</li>
          <li>GCP BigQuery</li>
          <li>GCP CloudRun</li>
          <li>Flask</li>
          <li>HuggingFace</li>
          <li>Jupyter Notebooks</li>
        </ul>
        <p>
          An app which leverages a HuggingFace BERT multiclass classifier to judge reddit posts from the popular r/AmITheAsshole subreddit according to their defined classification rules.
        </p> 
        
        <div class="button-group">
          <a class="word-link" href="https://backend-model-service-zkidffnq6a-uc.a.run.app/models/AITAclassmodel" target="_blank" rel="noopener noreferrer">
            Demo</a>
            
          <a id="AITAprojDescBtn" class="button open-modal-button word-link">Details</a>
        </div>
        <dialog id="AITAprojModal" class="modal">
          <div class="proj-dialog-header">
            <h1>Reddit r/AITA NLP Sentiment Classifier</h1>
            <a class="close-modal-button image-link">
              <img src="media/close.png" height="20">
            </a>
          </div>
          <hr>
          <div class="proj-dialog-body">
            <div class="dialog-body-text">
              <h3 class="dialog-body-section-header">About The Project</h3>
              <p>
                In this project, I created a data pipeline where I was able to retrieve posts from the subreddit r/amitheasshole via the reddit api, make transformations on them, and then store them in google bigquery. 
                At which point I was able to fine-tune a HuggingFace BERT-based transformer to generate sentiment based classifications on the post data. 
                I also created a basic flask application in which you could import posts live from the subreddit, run the model against them, and then respond to the post.
              </p>
              <p><b>Please Note:</b> The demo for this project is slow, the UI is purely for demonstration purposes and is not efficient. I would appreciate if you could keep your usage of it to minimum so my limited budget doesn't suffer too much :).</p>
              <div class="dialog-body-diagram-section">
                <h3 class="dialog-body-section-header">Project Stack Diagram</h3>
                <div class="dialog-body-stack-lists">
                  <div>
                    <h4>FullStack Tools:</h4>
                    <ol>
                      <li>Flask</li>
                      <li>Bootstrap</li>
                      <li>Docker</li>
                      <li>GCP</li>
                    </ol>
                  </div>
                  <div>
                    <h4>Data Science Tools:</h4>
                    <ol>
                      <li>HuggingFace</li>
                      <li>Jupyter Notebook</li>
                      <li>Numpy</li>
                      <li>Pandas</li>
                      <li>Matplotlib</li>
                      <li>sklearn</li>
                    </ol>
                  </div>
                </div>
                <img src="media/AITA-architecture.png">
              </div>
              <div class="dialog-body-diagram-section">
                <h3 class="dialog-body-section-header">Data Flow Diagram</h3>
                <p>
                  Before I launched my model, I had to gather the data and transform it into something storeable and useable to the model.
                  This took place in <b>Google BigQuery</b> where I stored my data in a SQL tables.
                  From there I was able to batch and extract the data as I needed it in order to train my BERT model.
                </p>
                <img src="media/AITA-data-flow.png">
              </div> -->
              <!-- <h3 class="dialog-body-section-header">My Contributions</h3>
              <h4>Technical</h4>
              <p>
                Even though I worked on many parts of this project, as did the rest of my group, my work on this project was generally focused building out the frontend application and pushing the project to AWS.
              </p>
              <h4>Non-technical</h4>
              <p>
                A major portion of the project which our group had to undertake was speaking with stakeholders, understanding their needs for the project, and making sure our design was well thought out and documented. 
                It was very important to us a group to set a good foundation for the project knowing that this project will be inherited.
                On top of machine generated documentation, we also wrote design docs which explained the intention behind the decisions that we made and how to get started with our code.
              </p>
              <p>
                Something that was also important to us was making sure that the inteded audience was actually getting something out of using our app.
                To ensure this we regularly met with our sponser to demo our work to ensure we were on the right track.
                We also rolled our app out to be used by students to gather data on how our app is used and how it performed.
              </p> -->
            <!-- </div>
            <div class="project-links">
              <a class="word-link" href="https://github.com/cstainsby/B-Onion" target="_blank" rel="noopener noreferrer">
                Code</a>
              <a class="word-link" href="https://backend-model-service-zkidffnq6a-uc.a.run.app/models/AITAclassmodel" target="_blank" rel="noopener noreferrer">
                Demo</a>
            </div>
          </div>
        </dialog>
      </div>
      <img class="project-img" src="media/AITA-screenshot.png">
    </div> -->

     <!-- This Website -->
     <!-- <div class="project">
      <div class="project-info">
        <h2>Personal Website</h2>
        <b>This Website</b>
        <ul class="skills-used">
          <li>JavaScript</li>
          <li>AWS</li>
          <li>Linux</li>
          <li>SASS</li>
          <li>HTML</li>
          <li>NGINX</li>
          <li>Node.js</li>
          <li>Express</li>
        </ul>
        <p>
          A website shich shows off 
        </p> 
        
        <div class="button-group">
          <a class="word-link" href="https://backend-model-service-zkidffnq6a-uc.a.run.app/models/AITAclassmodel" target="_blank" rel="noopener noreferrer">
            Demo</a>
          
          <a id="AITAprojDescBtn" class="button open-modal-button word-link">Details</a>
        </div>
        <dialog id="AITAprojModal" class="modal">
          <div class="proj-dialog-header">
            <h1>Reddit r/AITA NLP Sentiment Classifier</h1>
            <a class="close-modal-button image-link">
              <img src="media/close.png" height="20">
            </a>
          </div>
          <hr>
          <div class="proj-dialog-body">
            <div class="dialog-body-text">
              <h3 class="dialog-body-section-header">About The Project</h3>
              <p>
                In this project, I created a data pipeline where I was able to retrieve posts from the subreddit r/amitheasshole via the reddit api, make transformations on them, and then store them in google bigquery. 
                At which point I was able to fine-tune a HuggingFace BERT-based transformer to generate sentiment based classifications on the post data. 
                I also created a basic flask application in which you could import posts live from the subreddit, run the model against them, and then respond to the post.
              </p>
              <p><b>Please Note:</b> The demo for this project is slow, the UI is purely for demonstration purposes and is not efficient. I would appreciate if you could keep your usage of it to minimum so my limited budget doesn't suffer too much :).</p>
              <div class="dialog-body-diagram-section">
                <h3 class="dialog-body-section-header">Project Stack Diagram</h3>
                <div class="dialog-body-stack-lists">
                  <div>
                    <h4>FullStack Tools:</h4>
                    <ol>
                      <li>Flask</li>
                      <li>Bootstrap</li>
                      <li>Docker</li>
                      <li>GCP</li>
                    </ol>
                  </div>
                  <div>
                    <h4>Data Science Tools:</h4>
                    <ol>
                      <li>HuggingFace</li>
                      <li>Jupyter Notebook</li>
                      <li>Numpy</li>
                      <li>Pandas</li>
                      <li>Matplotlib</li>
                      <li>sklearn</li>
                    </ol>
                  </div>
                </div>
                <img src="media/AITA-architecture.png">
              </div>
              <div class="dialog-body-diagram-section">
                <h3 class="dialog-body-section-header">Data Flow Diagram</h3>
                <p>
                  Before I launched my model, I had to gather the data and transform it into something storeable and useable to the model.
                  This took place in <b>Google BigQuery</b> where I stored my data in a SQL tables.
                  From there I was able to batch and extract the data as I needed it in order to train my BERT model.
                </p>
                <img src="media/AITA-data-flow.png">
              </div>
            </div>
            <div class="project-links">
              <a class="word-link" href="https://github.com/cstainsby/B-Onion" target="_blank" rel="noopener noreferrer">
                Code</a>
              <a class="word-link" href="https://backend-model-service-zkidffnq6a-uc.a.run.app/models/AITAclassmodel" target="_blank" rel="noopener noreferrer">
                Demo</a>
            </div>
          </div>
        </dialog>
      </div>
    </div> -->

    <!-- Hockey Data -->
    <!-- <div class="project">
      <div class="project-info">
        <h1>Hockey Data Project</h1>
        <b>Class Project</b>
        <ul class="skills-used">
          <li>Python</li>
          <li>ML Data Structures</li>
          <li>Jupyter Notebooks</li>
          <li>EDA</li>
        </ul>
        <p>In a team of three members, we used Kaggle and NHL data for exploratory data analysis in conjunction with self-made and self-trained machine learning models (decision trees, random forests, KNN, and Naïve Bayes) to predict which NHL teams would make the playoffs (classification).</p>
        <div class="project-links">
          <a class="word-link" href="https://github.com/cstainsby/HockeyDataProject"  target="_blank" rel="noopener noreferrer">
            Code</a>
        </div>
      </div>
      <img class="project-img" src="media/hockey.png">
    </div> -->
</div>




<style lang="scss">

</style>