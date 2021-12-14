<h1>Instructions for running Dello-Box</h1>

Steps to run: (Assuming CLI is in root directory of the project)

1. cd dello-box-server
2. npm i
3. cd .. (To return to root directory)
4. make up-prod
5. Open a new browser and visit: http://localhost:3000/

Alternatively: (If you cannot use make commands)

1. cd dello-box-server
2. npm i
3. cd .. (To return to root directory)
4. docker-compose -f docker-compose.prod.yml up -d
5. docker exec dello-box-server-prod node_modules/.bin/knex migrate:latest (This will run migrations)
6. docker exec dello-box-server-prod node_modules/.bin/knex seed:run (This will run seeds)
7. Open a new browser and visit: http://localhost:3000/

<h1>Project Overview and Important Notes</h1>
 
Key highlights of our project for the checkpoint:

Frontend: (Currently all features are implemented and fully functional)<br>

- General: all featured pages prevent XSS as all inputted text are checked for escape characters and HTML tags. Only localhost:3000 can access the API endpoints, if a different application with a
  different port were to try and access our API it will not work<br>

- Signup: our sign up allows for new users to create a new account. Common fields that are included are; username, password, first name, last name, email and phone. Our users each have their own
  unique usernames, so when creating a user be sure to come up with something unique.<br>

- Sign in: with our authentication, users cannot access any offered routes unless signed in. Unauthorized access will be redirected to the landing page, while trying to gain access to other routes by
  changing the URL while signed in will redirect to the homepage. We used JSON web tokens (JWT) set to 1 day expirations to run authentication. <br>

- Contacts: users will be able to add each other through our search bar, currently with the search bar, it only returns users in the servers database that are like the searched username.
  Unfortunately, we we're not able to implement (Hook up) our API for nicknames as we ran out of time. In future iterations this will be implemented as everything is completed except for the frontend
  hook up. <br>

- Files: Our dropbox allows users to upload files of the following types; jpeg, png, pdf, docx/doc, pptx, csv, txt, and zip. With this users can upload and later attach files to tasks that they
  created. When uploading a file, by default the file privacy is set to private. By setting it to public, this allows users that are searching for files to see it. You do not need to be friends with a
  user that has a public file to see the file, as all files that are public are made for global view. There are three options for filtering files: All files, Public files and Your files. All files
  will show all the files the user uploaded and all the public files that they did not upload. Public files will show all the files marked as public (including the user's own public files). Your files
  will strictly only show the files that the user uploaded (both public and private) Please note that no files are in the database by default, the user will have to upload files themselves to see the
  functionality of this function. <br>

- Tasks: Similar to Trello, our Task feature allows users to create tasks and columns for tasks to go into. Users can edit a tasks information, a columns information, as well as deleting. Our most
  prominent feature is the ability to move tasks between columns and move columns themselves while keeping the integrity of the layout.<br>

- Calendar: The calendar can only show current tasks assigned to their days.<br>

- User: Users can click on their profile located on the top right of the window, in this screen they can either update their user information or delete themselves are a user from our system. While the
  delete a user API is public, malicious users who attempt to delete a user who are not themselves will have hard time. In order to successfully delete a user, the malicious users would have to submit
  a valid userid and uuid. The uuid is not viewable anywhere in our application and is randomely generated when a user is created and stored within their account information. This uuid is not passed
  in any of the feature APIs so no user's uuid will ever be revealed.<br>

Backend: We have all API's implemented in the backend, with input sanitization, authentication, and middleware. There is also endpoint restriction where certain routes are public and some are private.
Furthermor,e only localhost:3000 can access API functionality while all other ports will give CORS errors.<br>

Database: We currently have migrations and seeds working for Postgres. Migrations and seeds can be run easily with 2 simple commands. Timezone is enabled for PST time, to keep things consistent
throughout users that access our application in differnt timezones.<br>

Deployment: We have successfully dockerized our whole project using Docker and Docker Compose. The project can be run using a few simple commands. Client container has been made production ready by
using nginx to host the React application (Client)<br>

<h1>Login Credentials</h1>

Currently there are three valid user accounts:

- Username: username1, Password: user1
- Username: username2, Password: user2
- Username: username3, Password: passwordABC

<h1>Technologies Used</h1>

Frontend:

- Language: JavaScript (Node)
- Library: React
- CSS Framework: Boostrap (React Bootstrap)

Backend:

- Language: TypeScript (Node)
- Framework: Express
- Query Builder: Knex.js

Database:

- PostgresSQL

Deployment:

- Docker
- Docker Compose
- nginx

<h1>Resources and Tutorials</h1>

Links:

- https://react-bootstrap.github.io/components/alerts (Alerts)
- https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd (DelloBoard)
- https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=1492s (DelloBoard)
- https://blog.logrocket.com/creating-navbar-react/ (Help creating nav-bar)
- https://www.sliderrevolution.com/resources/css-animated-background/ (Home screen background animation)
- https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e (Production Ready React Nginx)
- https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f (Modified this TypeScript Docker boilerplate)
