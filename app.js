// -----------------------------------------------------------------------------------------------
//    Skill Icon Dynamic Fill
// -----------------------------------------------------------------------------------------------
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
    "Dev. Practices": [
        "agile",
        "cicd"
    ]
}
fillSkillIcons(skillDict);

// -----------------------------------------------------------------------------------------------
//    Email Form
// -----------------------------------------------------------------------------------------------
// send email 
const emailContactForm = document.getElementById('email-form');
const emailContactSubmitBtn = document.getElementById('email_submit');

emailContactSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Email Payload needs 
    //  1) from_name
    //  2) from_email
    //  3) message

    const spinner = document.createElement('div');
    spinner.className = 'spinner email-response-item'; 

    emailContactSubmitBtn.disabled = true;

    // Replace the button with the spinner
    emailContactSubmitBtn.parentNode.replaceChild(spinner, emailContactSubmitBtn);

    // Remove the spinner and display the result message after the result
    // returns from the request
    const displayMessage = document.createElement('p');
    displayMessage.className = 'email-response-item';



    // Get form values
    const from_name = document.getElementById('from_name').value;
    const from_email = document.getElementById('from_email').value;
    const email_message = document.getElementById('message').value;

    // Create a FormData object to send the values as JSON
    let formData = JSON.stringify({
      from_name: from_name,
      from_email: from_email,
      message: email_message
    });

    fetch('/send-email', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: formData
    })
    .then((response) => response.text())
    .then((result) => {
      console.log(result); // Optional: Log the server response
      // Handle success or display a success message to the user
      displayMessage.textContent = "Successfully Sent!"
      document.getElementById('from_name').value = "";
      document.getElementById('from_email').value = "";
      document.getElementById('message').value = "";
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        displayMessage.textContent = 'Error occurred trying to send email.';
    })
    .finally(function() {
        // Replace the spinner with the result message
        spinner.parentNode.replaceChild(displayMessage, spinner);

        // Re-enable the button after a brief delay
        setTimeout(function() {
          emailContactSubmitBtn.disabled = false;
          message.parentNode.replaceChild(emailContactSubmitBtn, displayMessage);
        }, 2000);
    });

});

// js elements to handle email send interactions 
// Get the button and spinner elements
// const button = document.getElementById('email_submit');
// const spinner = document.createElement('div');
// spinner.className = 'spinner'; // Add a CSS class to style the spinner

// // Attach the event listener to the button
// button.addEventListener('click', () => {
//   // Disable the button
//   button.disabled = true;

//   // Show the spinner
//   button.appendChild(spinner);

//   // Simulate an asynchronous request (replace with your actual request code)
//   setTimeout(() => {
//     const success = Math.random() < 0.5; // Randomly determine success or failure

//     // Remove the spinner
//     button.removeChild(spinner);

//     // Display the result message
//     const message = document.createElement('p');
//     if (success) {
//       message.textContent = 'Request successful!';
//       message.className = 'success'; // Add a CSS class to style the success message
//     } else {
//       message.textContent = 'Error occurred during the request.';
//       message.className = 'error'; // Add a CSS class to style the error message
//     }

//     button.appendChild(message);

//     // Re-enable the button after a brief delay
//     setTimeout(() => {
//       button.disabled = false;
//       button.removeChild(message);
//     }, 2000);
//   }, 2000); // Simulate a 2-second delay for the request
// });


// -----------------------------------------------------------------------------------------------
//    Modal implementation
// -----------------------------------------------------------------------------------------------
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
// modal mappings to buttons
const modalOpenBtnIdToModalId = {
  "AITAprojDescBtn": "AITAprojModal",
  "BioPathprojDescBtn": "BioPathprojModal",
  "MathResearchBtn": "MathResearchModal"
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

// -----------------------------------------------------------------------------------------------
//    Scroll Animations
// -----------------------------------------------------------------------------------------------
// scroll animations 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.remove("show");
    }
  });
});

const slideInElements = document.querySelectorAll(".slideIn");
slideInElements.forEach((element) => { observer.observe(element) });