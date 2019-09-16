# Open Bankin System Web Application

This is just a demo application.

## How to run

-   Clone project into your local
-   Get into project folder and then run `npm run install` or `yarn install`
-   Then just run `npm run start` or `yarn start`
-   Go to `http://localhost:3000`
-   Try to `Register` and then `Login` with registered user
-   Current `.env.stage` file configured for server url. If you would like to connect your own
    server application. Update `.env.local` file

## How to Use

-   Application is running on AWS S3 bucket.
    [Link is here.](http://openbanking-stage.s3-website.eu-west-2.amazonaws.com/) </br>Access to the
    URL and register or login.
-   API is running on AWS EC2 instance.
    [API repository is here](https://github.com/tolgaduzenli/open-banking-system)
-   Application deployed to AWS S3 bucket by CircleCI

## General Notes

-   Application has two different user role `(OFFICER or CLIENT)`

-   During the registration process, you have to choose one of them
-   If you choose `CLIENT`, then you would be able to create application
-   If you go with `OFFICER`, you will be officer and have access to all of the applications
-   Clients create application, Officer can `APPROVE` or `REJECT` it.
-   Each client has access for only his/her own applications.
-   Client can update or delete their applications unless applications status is `APPROVED` or
    `REJECTED`
