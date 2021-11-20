<h1>Instructions for running Dello-Boxx</h1>

Steps to run:

- npm i in dello-box-client and dello-box-server
- make build (or docker-compose build)
- make up (or docker-compose up -d)
- make migrate (or docker exec dello-box-server node_modules/.bin/knex migrate:latest)
- make seed (or docker exec dello-box-server node_modules/.bin/knex seed:run)
