# Portfolio


## Description
This project is about my portfolio.


## Installation
- Install docker, vary depend on the OS, check https://docs.docker.com/engine/install/
- Build docker image (may need admin or sudo prefix), note that there is dot at the end. You can 
change the image name and version to your own need:
    
        docker build -t image_name:version .
- Run container with the image created, change docker port and app port to the actual port used:
    
        docker run -p 127.0.0.1:docker_port:app_port image_name:version


## Support
nguyennta@icloud.com


## Contributing
Project structure:
- route: contain file for routing.
- static: contain static file such as css, images.
- templates: contain html file.
- app.py: main file to run this project (Flask application is created here).
- Dockerfile: file used to containerize this project with docker.
- README.md: this project instruction file.
- requirements.txt: file contain the dependencies that need to install.


## Authors
This project is done by nguyennta@icloud.com


## License
This is just a personal project for portfolio page.


## Project status
- Finished.
- Current host: https://portfolio-698202522757.asia-southeast1.run.app
- This project’s source code is hosted on GitHub, with CI/CD handled by Cloud Build 
and deployed via Cloud Run — both part of Google Cloud Platform (GCP).
