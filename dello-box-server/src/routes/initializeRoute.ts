import { Router } from 'express';
import userRoutes from './userRoute';
import taskRoutes from './taskRoute';
import userInfoRoutes from './userInfoRoute';
import fileRoutes from './fileRoute';
import contactRoutes from './contactsRoute';
import fileListRoutes from './fileListRoute';
import authenticationRoutes from './authenticationRoute';
import passport from 'passport';

const authRouter = Router();
authRouter.use('/auth', authenticationRoutes);

const apiRouter = Router();
// Uncomment the follow line to restrict routes
// apiRouter.use(passport.authenticate('authAll', { session: false }));
apiRouter.use('/auth', authenticationRoutes);
apiRouter.use('/user-info', userInfoRoutes);
apiRouter.use('/file', fileRoutes);
apiRouter.use('/file-list', fileListRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/task', taskRoutes);
apiRouter.use('/contacts', contactRoutes);

const initializeRouter = Router();
initializeRouter.use(authRouter);
initializeRouter.use(apiRouter);

export default initializeRouter;
