build:
	docker-compose build

down: 
	docker-compose down

migrate:
	docker exec dello-box-server node_modules/.bin/knex migrate:latest

seed:
	docker exec dello-box-server node_modules/.bin/knex seed:run

stop:
	docker-compose stop

u:
	docker-compose up

up:
	docker-compose up -d

up-proj:
	docker-compose up -d
	docker exec dello-box-server node_modules/.bin/knex migrate:latest
	docker exec dello-box-server node_modules/.bin/knex seed:run

up-prod:
	docker-compose -f docker-compose.prod.yml build
	docker run -d -p 3000:80 --name dello-box-client-prod dello-box-client-prod
	docker-compose up -d
	docker exec dello-box-server-prod node_modules/.bin/knex migrate:latest
