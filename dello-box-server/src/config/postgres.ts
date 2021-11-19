import config from './config';

export const Knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: config.database.host,
    port: 5432,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  }
});
