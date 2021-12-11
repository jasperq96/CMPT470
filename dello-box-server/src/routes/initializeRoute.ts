import { Router } from 'express';
import userPublicRoutes from './userPublicRoute';
import userPrivateRoutes from './userPrivateRoute';
import taskRoutes from './taskRoute';
import userInfoRoutes from './userInfoRoute';
import fileRoutes from './fileRoute';
import contactRoutes from './contactsRoute';
import fileListRoutes from './fileListRoute';
import authenticationRoutes from './authenticationRoute';
import passport from 'passport';

const authRouter = Router();
authRouter.use('/auth', authenticationRoutes);

const publicRouter = Router();
publicRouter.use('/user', userPublicRoutes);

const privateRouter = Router();
// Uncomment the follow line to restrict routes
// privateRouter.use(passport.authenticate('authAll', { session: false }));
privateRouter.use('/auth', authenticationRoutes);
privateRouter.use('/user-info', userInfoRoutes);
privateRouter.use('/file', fileRoutes);
privateRouter.use('/file-list', fileListRoutes);
privateRouter.use('/user', userPrivateRoutes);
privateRouter.use('/task', taskRoutes);
privateRouter.use('/contacts', contactRoutes);

const initializeRouter = Router();
initializeRouter.use(authRouter);
initializeRouter.use(publicRouter);
initializeRouter.use(privateRouter);

export default initializeRouter;
