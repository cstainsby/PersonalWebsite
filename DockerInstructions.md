# Docker Instructions
How to interact with docker within this project.

*All commands provided assume you will be running them within the directory in which the dockerfile is located.*

## Docker Compose 
For development in a local enviroment use the docker compose file to orchistrate which services are running.

## Standard Dockerfile Commands
Commands I'll be using to work with docker/project.

**Build**

    docker build -t cstainsby/cstain_personal_website_repo:<tag> .

**Run**

    docker run -d -p <host_machine_port>:<docker_port> cstainsby/cstain_personal_website_repo:<tag>

-d: required for detached mode

**Login**

    docker login

**Push**

For this project I will be pushing images to DockerHub for storage. Logging in will be required for this step.

    docker push cstainsby/cstain_personal_website_repo:<tag>
