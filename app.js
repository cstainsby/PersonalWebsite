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
        "mysql",
        "javascript"
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
    "Dev. Practicies": [
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

        const button = document.getElementById('email_submit');
        const spinner = document.createElement('div');
        spinner.className = 'spinner email-response-item'; 

        button.disabled = true;

        // Replace the button with the spinner
        button.parentNode.replaceChild(spinner, button);

        // Remove the spinner and display the result message after the result
        // returns from the request
        const message = document.createElement('p');
        message.className = 'email-response-item';

        emailjs
        .sendForm(
            "service_tknknfq",
            "template_9kiv18q",
            document.getElementById("email-form"),
            "yl51Nnibdor99pN-H"
        )
        .then(function() {
            

            console.log('SUCCESS!');
            message.textContent = 'Email Sent Successfully!';
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            message.textContent = 'Error occurred trying to send email.';
        })
        .finally(function() {
            // Replace the spinner with the result message
            spinner.parentNode.replaceChild(message, spinner);

            // Re-enable the button after a brief delay
            setTimeout(function() {
            button.disabled = false;
            message.parentNode.replaceChild(button, message);
            }, 2000);
        });

    });

// js elements to handle email send interactions 
// Get the button and spinner elements
const button = document.getElementById('email_submit');
const spinner = document.createElement('div');
spinner.className = 'spinner'; // Add a CSS class to style the spinner

// Attach the event listener to the button
button.addEventListener('click', () => {
  // Disable the button
  button.disabled = true;

  // Show the spinner
  button.appendChild(spinner);

  // Simulate an asynchronous request (replace with your actual request code)
  setTimeout(() => {
    const success = Math.random() < 0.5; // Randomly determine success or failure

    // Remove the spinner
    button.removeChild(spinner);

    // Display the result message
    const message = document.createElement('p');
    if (success) {
      message.textContent = 'Request successful!';
      message.className = 'success'; // Add a CSS class to style the success message
    } else {
      message.textContent = 'Error occurred during the request.';
      message.className = 'error'; // Add a CSS class to style the error message
    }

    button.appendChild(message);

    // Re-enable the button after a brief delay
    setTimeout(() => {
      button.disabled = false;
      button.removeChild(message);
    }, 2000);
  }, 2000); // Simulate a 2-second delay for the request
});


// Function to enable scrolling
function enableScroll() {
  const body = document.body;
  body.classList.remove('no-scroll');
}

// Function to disable scrolling
function disableScroll() {
  const body = document.body;
  body.classList.add('no-scroll');
}

// modal implementation
let currentOpenModal = null; // modal object
const openModalButtonElements = document.querySelectorAll(".open-modal-button");
const closeModalButtonElements = document.querySelectorAll(".close-modal-button");
const openModalButtons = Array.from(openModalButtonElements);
const closeModalButtons = Array.from(closeModalButtonElements)

const modalOpenBtnIdToModalId = {
  "AITAprojDescBtn": "AITAprojModal",
  "BioPathprojDescBtn": "BioPathprojModal"
}

// on refresh check local storage, reopen
const modalIdentifier = localStorage.getItem("currentOpenModal");
if (modalIdentifier) {
  openModal(modalIdentifier);
}

function openModal(modalIdentifier) {
  const modal = document.querySelector("#" + modalIdentifier);

  modal.showModal();
  currentOpenModal = modal;

  // hide the "to top" arrow
  var link = document.getElementById('bottom-right-link');
  link.style.display = 'none'; 
  // save modalIdentifier to localStorage
  localStorage.setItem("currentOpenModal", modalIdentifier);

  disableScroll();
}

function closeModal() {
  // remove modal from screen
  if (currentOpenModal) {
    currentOpenModal.close();
    currentOpenModal = null;
  }
  // repaint the "to top" arrow
  var link = document.getElementById('bottom-right-link');
  link.style.display = 'block'
  // remove modalIdentifier from the localStorage
  localStorage.removeItem("currentOpenModal");

  enableScroll();
}


// event listeners for buttons
openModalButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const modalId = modalOpenBtnIdToModalId[e.target.id];
    if (!modalId) {
      console.log("ERROR: modal lookup table missing button element");
      return;
    } 
    openModal(modalId);
  });
});
closeModalButtons.forEach(button => {
  button.addEventListener("click", () => {
    closeModal();
  });
});

// for the bottom right navigator button, only make it appear if the user has scrolled down
// make sure a modal is not being displayed before displaying the arrow link
window.addEventListener('scroll', function() {
  var link = document.getElementById('bottom-right-link');
  if (window.scrollY < 1 || currentOpenModal) {
    link.style.display = 'none'; // Hide the link when at the top of the page
  } else {
    link.style.display = 'block'; // Show the link when scrolling down
  }
});