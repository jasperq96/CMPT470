import http from 'http';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import dummyRoutes from './routes/dummyRoute';
import userRoutes from './routes/userRoute';

export const createServer = () => {
  const router: Application = express();
  return router;
};

export const sendFirstRequest = (router: Application) => {
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to DelloBox!');
  });
};

export const enableCors = (router: Application) => {
  const allowedOrigins = config.server.corsOriginUrl;
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
  };

  router.use(cors(options));
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigins);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization,');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
      return res.status(200).json({});
    }
    next();
  });
};

export const enableLogging = (router: Application, namespace: string) => {
  router.use((req, res, next) => {
    logging.info(namespace, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
      logging.info(namespace, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
  });
  const morgan = require('morgan');
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  router.use(morgan('dev'));
};

export const enableRoutes = (router: Application) => {
  router.use('/dummy', dummyRoutes);
  router.use('/users', userRoutes); //adding route for API
};

export const enableErrorHandling = (router: Application) => {
  router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
      message: error.message
    });
  });
};

export const enableServerListening = (router: Application, namespace: string) => {
  const httpServer = http.createServer(router);
  httpServer.listen(config.server.port, () => logging.info(namespace, `Server running on ${config.server.hostname}:${config.server.port}`));
};
