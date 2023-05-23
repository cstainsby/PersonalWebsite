// Get a reference to the button element
// const scrollButton = document.getElementById('scrollButton');

// // Add a click event listener to the button
// scrollButton.addEventListener('click', () => {
//   // Scroll the user down to a specific element or position
//   // Here, we're scrolling to the bottom of the page
//   window.scrollTo({
//     top: document.body.scrollHeight,
//     behavior: 'smooth' // This adds smooth scrolling effect
//   });
// });

// let aniCircle = document.querySelector('.circle');
// let circleRadius = "200px";
// let expandedCircleRadius = "250px"

// function handleCircleButtonClick(buttonClicked) {
//     aniCircle.classList.contains('expanded') 
//         ? shrinkCircle() 
//         : expandCircle();
// }

// function expandCircle() {
//     let content = document.querySelector('.content');
//     aniCircle.classList.toggle('expanded');
//     content.style.display = 'block';

//     // adjust dimensions 
//     aniCircle.style.height = expandedCircleRadius;
//     aniCircle.style.width = expandedCircleRadius;
// }

// function shrinkCircle() {
//     let content = document.querySelector('.content');
//     aniCircle.classList.remove('expanded');
//     content.style.display = 'none';
    
//     // adjust dimensions 
//     aniCircle.style.height = circleRadius;
//     aniCircle.style.width = circleRadius;
// }
  
// const numSmallCircles = 8; // Specify the number of smaller circles
// const smallCircleRadius = 90; // Radius of the smaller circles' path

// for (let i = 0; i < numSmallCircles; i++) {
//     const smallCircle = document.createElement('div');
//     smallCircle.className = 'small-circle';
//     const angle = (360 / numSmallCircles) * i;
//     const radians = angle * (Math.PI / 180);
//     const x = Math.cos(radians) * smallCircleRadius;
//     const y = Math.sin(radians) * smallCircleRadius;
//     smallCircle.style.transform = `translate(${x}px, ${y}px)`;
//     aniCircle.appendChild(smallCircle);
// }

// for the bottom right navigator button, only make it appear if the user has scrolled down
window.addEventListener('scroll', function() {
    var link = document.getElementById('bottom-right-link');
    if (window.pageYOffset < 256) {
      link.style.display = 'none'; // Hide the link when at the top of the page
    } else {
      link.style.display = 'block'; // Show the link when scrolling down
    }
  });
  

// create skill icon name element 
function createSkillIconElement(iconName) {
    iconName = iconName.toLowerCase(); 
    const element = document.createElement('div');
    element.className = 'skill-icon-element';
    
    const icon = document.createElement('img');
    icon.src = 'media/' + iconName + '.png';
    
    const text = document.createElement('p');
    text.textContent = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    
    element.appendChild(icon);
    element.appendChild(text);
    
    return element;
}

// dynamically fills the skill section with a dictionary
function fillSkillIcons(skillSectionDict) {
    const sectionContent = document.getElementById("skills-section-content");
  
    for (const section in skillSectionDict) {
      const skillSection = skillSectionDict[section];
      const skillSetOfType = document.createElement('div');
      skillSetOfType.className = 'skillset-of-type';
  
      const sectionTitle = document.createElement('h1');
      sectionTitle.textContent = section;
  
      skillSetOfType.appendChild(sectionTitle);
  
      const iconSection = document.createElement('div');
      iconSection.className = 'icon-section';
  
      skillSection.forEach(skill => {
        const iconElement = createSkillIconElement(skill);
        iconSection.appendChild(iconElement);
      });
  
      skillSetOfType.appendChild(iconSection);
      sectionContent.appendChild(skillSetOfType);
    }
    

  }

skillDict = {
    "Languages": [
        "python",
        "java",
        "c++",
        "mysql",
        "js"
    ],
    "Frontend": [
        "react",
        "html",
        "css"
    ],
    "Backend": [
        "Flask",
        "fastapi",
        "node.js"
    ],
    "Data Science": [
        "jupyter",
        "pandas",
        "numpy",
        "sklearn"
    ],
    "Tools and Platforms": [
        "docker",
        "aws",
        "github",
        "linux"
    ],
    "Dev Practicies": [
        "agile",
        "cicd"
    ]
}
fillSkillIcons(skillDict);


// send email 
document.getElementById('email-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        // Email Payload needs 
        //  1) from_name
        //  2) from_email
        //  3) message

        emailjs.sendForm(
            "service_tknknfq", 
            "template_9kiv18q", 
            document.getElementById("email-form"), 
            "yl51Nnibdor99pN-H") 

            .then(function() {
                
                console.log('SUCCESS!');
                e.target.from_name.value = "";
                e.target.from_email.value = "";
                e.target.message.value = "";
            }, function(error) {
                console.log('FAILED...', error);
            })
            .catch(err => {
                console.log("ERROR on email submission " + JSON.stringify(err));
            });
    });