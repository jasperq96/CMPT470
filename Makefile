build:
	docker-compose build

down: 
	docker-compose down

down-prod:
	docker-compose -f docker-compose.prod.yml down

migrate:
	docker exec dello-box-server node_modules/.bin/knex migrate:latest

seed:
	docker exec dello-box-server node_modules/.bin/knex seed:run

stop:
	docker-compose stop

stop-prod:
	docker-compose -f docker-compose.prod.yml stop

u:
	docker-compose up

up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.prod.yml up -d
	docker exec dello-box-server-prod node_modules/.bin/knex migrate:latest

up-proj:
	docker-compose up -d
	docker exec dello-box-server node_modules/.bin/knex migrate:latest
	docker exec dello-box-server node_modules/.bin/knex seed:run

