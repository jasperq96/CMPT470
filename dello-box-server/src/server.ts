import http from 'http';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/userRoute';
import taskRoutes from './routes/taskRoute';
import userInfoRoutes from './routes/userInfoRoute';
import fileRoutes from './routes/fileRoute';
import fileListRoutes from './routes/fileListRoute';
import authenticationRoutes from './routes/authenticationRoute';
import './middlewares/passportStrategy.mw';
import passport from 'passport';
import cookieParser from 'cookie-parser';

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
  logging.debug('origins', 'ALLOWED ORIGINS IS', allowedOrigins);
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
  };
  router.use(cors(options));
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', allowedOrigins);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
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
  router.use(cookieParser());
  router.use(passport.initialize());
};

export const enableRoutes = (router: Application) => {
  router.use('/auth', authenticationRoutes);
  router.use('/user-info', userInfoRoutes);
  router.use('/file', fileRoutes);
  router.use('/file-list', fileListRoutes);
  router.use('/user', userRoutes);
  router.use('/task', taskRoutes);
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
