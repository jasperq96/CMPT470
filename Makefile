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
