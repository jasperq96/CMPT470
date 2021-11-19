require('dotenv').config();

// const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_HOST || 'dello-box-database',
      port: 5432,
      user: process.env.POSTGRES_USER || 'GNINE',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'delloboxdb'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seed: {
      directory: './seeds'
    }
    // ...knexSnakeCaseMappers()
  }
};
