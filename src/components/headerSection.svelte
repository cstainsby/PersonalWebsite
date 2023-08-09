
<style lang="scss">
    #greeting-section-background-imgs {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: var(--zind-background);

        & #mountain-png {
            position: absolute;
            width: 100%;
            height: 50%;
            bottom: 0px;
            left: 0px;

            max-height: 30%;
        }

        & #side-cloud-png {
            position: absolute;
            width: 25%;
            height: auto;
            top: 200px;
            right: 0px;
        }

        & #planet-png {
            position: absolute;
            width: 10%;
            height: auto;
            top: 50px;
            right: 15%;
        }

        & #middle-cloud-png {
            position: absolute;
            width: 20%;
            height: auto;
            top: 200px;
            right: 30%;

            @media (max-width: 1000px) {
            visibility: hidden;
            }
        }
    }

    #greeting-section {
        min-height: 100vh;
        background-color: var(--darkT-black-1);
        z-index: var(--zind-foreground);

        & .section-title {
            margin-top: 12px;
            font-size: 64px;
            text-align: left;
        }

        & .section-body {
            z-index: var(--zind-foreground);
        }

        // links to indeed, github, etc
        & #greeting-links {
            display: flex;
            justify-content: start;
            padding-top: 24px;
            z-index: var(--zind-foreground);

            & .image-link {
            margin-right: 24px;
            }
        }

        & #navigation-links {
            display: flex;
            flex-wrap: wrap;
            & a {
            z-index: var(--zind-foreground);
            }
        }
        }
</style>


    <!-- greeting section -->
<div id="greeting-section">
    <!-- static imgs used in decorating the header section -->
    <div id="greeting-section-background-imgs">
        <img id="planet-png" src="media/planet.png">
        <img id="side-cloud-png" src="media/cloud.png">
        <img id="mountain-png" src="media/mountain.png">
        <img id="middle-cloud-png" src="media/middlecloud.png">
    </div>

    <div class="section-content">
        <div class="header">
            <div class="section-title">Hello!</div>
            <div class="section-title">I'm Cole Stainsby.</div>
        </div>
    
        <div id="greeting-links">
            <a class="image-link" href="https://www.linkedin.com/in/colestainsby/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <img src="media/linkedin-link-icon.png" alt="LinkedIn" height="40px" width="40px" />
            </a>      
            <a class="image-link" href="https://github.com/cstainsby" target="_blank" rel="noopener noreferrer" title="GitHub">
            <img src="media/github-link-icon.png" alt="GitHub" height="40px" width="40px"/>
            </a>
            <a class="image-link" href="https://www.kaggle.com/colestainsby" target="_blank" rel="noopener noreferrer" title="Kaggle">
            <img src="media/kaggle-link-icon.png" height="40px" width="40px"/>
            </a>
            <a class="image-link" href="https://coles-resume-bucket.s3.us-west-2.amazonaws.com/ColeStainsbyResume.pdf" target="_blank" rel="noopener noreferrer" title="Resume">
            <img src="media/resume-link-icon.png" height="40px" width="30px"/>
            </a>
        </div>
    
        <div class="section-body">
            <p>Gonzaga Computer Science B.S. Graduate.</p>
            <p>Entry Level Software Engineer.</p>
        </div>
    
        <div id="navigation-links">
            <a class="word-link" href="#projects-section">
            <b>Projects</b>
            </a>
            <!-- </a> -->
            <a class="word-link" href="#about-me-section">
            <b>About Me</b>
            </a>
            <a class="word-link" href="#skills-section">
            <b>Skills</b>
            </a>
            <a class="word-link" href="#contact-section">
            <b>Contact Me</b>
            </a>
        </div>
    </div>
    
</div>