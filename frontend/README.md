# Personal Website Project
This project is intended to show off who I am as well as my accomplishments. It gives users an easy way to get in contact with me.

## Design Decisions
### The Refactor
Initially this site was written purely in vanilla js, html and scss as a static page. This page was inteded to be served over express. This solution, even though it worked in the beginning it's flaws began to show as my overall vision for the project grew. 

The important use cases which prompted this change were:
1. More friends and family want me to make a website for them, making the overall system capable of dynamical change to the new data needs was a necesity.
1. The ability for the website owner to come beack in at any point and update the system with new information regardless of technical or app knowledge. 

As a solution to this issue I felt it was best to switch to a component based frontend framework and a backend to serve it. I felt sveltekit filled both of these requirements while offering a lightweight and fast expirience for my small application.

In addition I refactored all of my JavaScript code into TypeScript which helped ensure type saftey and speed up application development. 

## Technologies Used


### Libraries
- sveltekit
- aws-sdk (SNS)
- zero-md