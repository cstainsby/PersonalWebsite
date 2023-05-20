
import githubLogo from "../media/github_logo.png";
import kaggleLogo from "../media/kaggle_logo.png";
import linkedinLogo from "../media/linkedIn_logo.png";

const AboutMeSection = () => {
    /**
     * AboutMeSection displays important information ralative to me like:
     *      Name
     *      description about me and my interests
     *      Links to linkedin, github and kaggle
     *      employment status
     *      A button which takes the user to the contact me section
     *      
     */
    return (
        <div id="AboutMeSection">
            <h1>Hi!</h1>
            <h1>I'm Cole Stainsby</h1>
            <p>Welcome to my Website</p>
            <DescribeMeSection />
            <CurrentEmploymentStatusSubSection />
            <LinksSubSection/>
        </div>
    )
}

const DescribeMeSection = () => {
    let descriptionOfMe = "I am an entry-level computer science engineer with a passion for data looking for a full-time programming position that will allow me to provide business impact, solve problems and contribute to a team."

    return (
        <div id="DescribeMeSection">
            <p>{ descriptionOfMe }</p>
        </div>
    )
}


const LinksSubSection = () => {
    return (
        <div id="LinksSubSection">
            <div class="list-group list-group-flush">
                <a href="https://www.linkedin.com/" target="_blank" class="list-group-item list-group-item-action active">
                    <img src={linkedinLogo} alt="LinkedIn" width="50"/>
                </a>
                <a href="https://github.com/" target="_blank" class="list-group-item list-group-item-action">
                    <img src={githubLogo} alt="GitHub" width="50"/>
                </a>
                <a href="https://www.kaggle.com/" target="_blank" class="list-group-item list-group-item-action">
                    <img src={kaggleLogo} alt="Kaggle" width="50"/>
                </a>
            </div>
        </div>
    )
}

const CurrentEmploymentStatusSubSection = (props) => {
    let currentEmployer = null;
    let jobPositionTitle = null;

    return (
        <div id="CurrentEmploymentSubsection">
            <p>I am currently
            {(currentEmployer && jobPositionTitle)  
                ? "employed at " + currentEmployer + " as a " + jobPositionTitle
                : " open to new job opportunities"
            }</p>
            <button type="button" class="btn btn-primary">Contact Me</button>
        </div>
    )
}

export default AboutMeSection;