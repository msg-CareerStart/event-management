# docker

The docker repo for the project is: [Dockerhub](https://hub.docker.com/repository/docker/erwinhilbert/event-management)

(tag - version of the project)

To download the image to your local pc: `docker pull erwinhilbert/event-management:tag`

After making modifications to update the local image (curent dir. is backend): `docker build -t erwinhilbert/event-management:tag .`

To run the project with h2 database: `docker run -it -p 8080:8080 erwinhilbert/event-management:tag`

To run the project with RDS database: `docker run -it -p 8080:8080 --env PROFILE=prod erwinhilbert/event-management:tag`

Additional optional environment variables for the application:

`DB` url to the database of the application

`DB_USERNAME` and `DB_PASSWORD` to set the username and pw of the database

`S3` the name of the s3 bucket where the tickets are stored

To push changes to dockerhub (after getting access to the repo and logging in): `docker push erwinhilbert/event-management:tag`
