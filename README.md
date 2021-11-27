<h1>Instructions for running Dello-Box</h1>

Steps to run:

- npm i in dello-box-client and dello-box-server (Only when new packages are added to a branch)
- make build (or docker-compose build)
- make up (or docker-compose up -d)
- make migrate (or docker exec dello-box-server node_modules/.bin/knex migrate:latest)
- make seed (or docker exec dello-box-server node_modules/.bin/knex seed:run)

Alternatively:

- npm i in dello-box-client and dello-box-server
- make build (or docker-compose build)
- make up-proj (or docker-compose up -d; docker exec dello-box-server node_modules/.bin/knex migrate:latest; docker exec dello-box-server node_modules/.bin/knex seed:run;)

Making a migration file:

- docker exec dello-box-server node_modules/.bin/knex migrate:make -x ts "name_of_table"

Making a seed file:

- docker exec dello-box-server node_modules/.bin/knex seed:make -x ts "name_of_seed"

<h1>Login Credentials</h1>

Currently there are two valid user accounts:

- Username: username1, Password: user1
- Username: username2, Password: user2
