Dello Box Project:
 
Key highlights of our project for the checkpoint:

    Frontend:
        Currently all features are implemented and fully functional:
            - General: all featured pages prevent XSS as all inputted text are checked for escape characters and HTML tags. Only localhost:3000 can access the API endpoints, if a different application with a different port were to try and access our API it will not work

            - Signup: our sign up allows for new users to create a new account. Common fields that are included are; username, password, first name, last name, email and phone. Our users each have their own unique usernames, so when creating
            a user be sure to come up with something unique.

            - Sign in: with our authentication, users cannot access any offered routes unless signed in. Unauthorized access will be redirected to the landing page, while trying to gain access to other routes by changing the URL while signed in will redirect
            to the homepage. We used JSON web tokens (JWT) set to 1 day expirations to run authentication. 

            - Contacts: users will be able to add each other through our search bar, currently with the search bar, it only returns users in the servers database that are like the searched username. Unfortunately, we we're not able to implement (Hook up) our API for nicknames 
            as we ran out of time. In future iterations this will be implemented as everything is completed except for the frontend hook up.

            - Files: Our dropbox allows users to upload files of the following types; jpeg, png, pdf, docx/doc, pptx, csv, txt, and zip. With this users can upload and later attach files to tasks that they created. When uploading a file, by default the file privacy
            is set to private. By setting it to public, this allows users that are searching for files to see it. You do not need to be friends with a user that has a public file to see the file, as all files that are public are made for global view.

            - Tasks: Similar to Trello, our Task feature allows users to create tasks and columns for tasks to go into. Users can edit a tasks information, a columns information, as well as deleting. Our most prominent feature is the ability to move tasks between columns
            and move columns themselves while keeping the integrity of the layout.

            - Calendar: The calendar can only show current tasks assigned to their days.

            - User: Users can click on their profile located on the top right of the window, in this screen they can either update their user information or delete themselves are a user from our system. The delete API is public, malicious users who want to delete a user
            who are not themselves are required to submit a userid and a uuid. A uuid is not viewable anywhere in our application and is randomely generated when a user is created and stored within their account information. 

    Backend:
        We have all API's implemented in the backend, with input sanitization, authentication, and middleware. Endpoint restriction and only localhost:3000 can access API functionality while all other ports will give CORS errors.

    Database:
        We currently have migrations and seeds working for Postgres. Migrations and seeds can be run easily with 1 simple command. Please see the README.md
        for more details. Timezone is enabled for PST time, to keep things consistent throughout users that access our application in differnt timezones.

    Deployment:
        We have successfully dockerized our whole project using Docker and Docker Compose. The project can be run using a few simple commands. Client container uses Nginx to host static files. Please see the 
        README.md for more details.