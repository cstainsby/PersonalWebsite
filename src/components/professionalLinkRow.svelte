

<style lang="scss">
    // for links with images displayed rather than words
    .image-link {
        display: inline-block;
        position: relative;
    }
    .image-link img {
        transition: transform var(--button-transition-time) ease-in-out;
    }
    .image-link:hover img {
        transform: scale(1.15); /* Increase the size of the image on hover */
    }
</style>

<div>
    <a class="image-link" href="https://www.linkedin.com/in/colestainsby/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
        <img src="media/linkedin-link-icon.png" alt="LinkedIn" height="40px" width="40px" />
    </a>      
    <a class="image-link" href="https://github.com/cstainsby" target="_blank" rel="noopener noreferrer" title="GitHub">
        <img src="media/github-link-icon.png" alt="GitHub" height="40px" width="40px"/>
    </a>
    <a class="image-link" href="https://www.kaggle.com/colestainsby" target="_blank" rel="noopener noreferrer" title="Kaggle">
        <img src="media/kaggle-link-icon.png" alt="Kaggle" height="40px" width="40px"/>
    </a>
    <a class="image-link" href="https://coles-resume-bucket.s3.us-west-2.amazonaws.com/ColeStainsbyResume.pdf" target="_blank" rel="noopener noreferrer" title="Resume">
        <img src="media/resume-link-icon.png" alt="Resume" height="40px" width="30px"/>
    </a>
</div>