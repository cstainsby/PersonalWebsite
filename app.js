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