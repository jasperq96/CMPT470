Dello Box Project:
 
Key highlights of our project for the checkpoint:

    Frontend:
        We currently have several placeholder pages made on the client. Their purpose is to give a rough idea of how the client will be structured.
        Please notice how there is already a sample placeholder page made for every key feature we are planning to have in the final implementation
        of the project. All of the placeholder pages can accessed on the client currently.

    Backend:
        We currently have several apis already implemented on the backend. There is an almost complete authentication api and a completed api for 
        uploading files and retrieving files. The authentication api currently allows a user to login with valid crendentials, allows validating a
        user's crendentials to see if they are authenticated or not (Using jwt tokens and cookies) and allows a user to logout. Both authentication
        and uploading/retrieving files have middleware already implemented. Furthemore, several sample apis were written for other features such as
        retreiving tasks, users, user information and dummies (dummies were for testing purposes only). The api can be found under the dello-box-postman
        folder as a json which can be imported into postman.

    Database:
        We currently have migrations and seeds working for Postgres. Migrations and seeds can be run easily with 1 simple command. Please see the README.md
        for more details.

    Deployment:
        We have successfully dockerized our whole project using Docker and Docker Compose. The project can be run using a few simple commands. Please see the 
        README.md for more details.

