import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 2999;
const CORS_ORIGIN_URL = process.env.CORS_ORIGIN_URL || 'http://localhost:8079';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  corsOriginUrl: CORS_ORIGIN_URL
};

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'dello-box-database';
const POSTGRES_DB = process.env.POSTGRES_DB || 'delloboxdb';
const POSTGRES_USER = process.env.POSTGRES_USER || 'GNINE';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';

const POSTGRES = {
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST
};

const config = {
  server: SERVER,
  database: POSTGRES
};

export default config;
