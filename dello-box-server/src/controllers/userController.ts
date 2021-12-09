import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import userAuth from './requestTemplates/authUserController';
import authConfig from 'utils/authConfig';
import { userDoesExist } from 'utils/authMessages';
import { getItems } from './requestTemplates/getAllRequest';
import { insertItem } from './requestTemplates/createRequest';
import { User } from 'db/models/userModel';
import { UserInfo } from 'db/models/userInfoModel';

const NAMESPACE = 'User Control';
const TABLE_USER = 'user';
const TABLE_USER_INFO = 'user_info';

const userInputtedReqBody = (req: Request) => {
  const { username, password } = req.body;
  return { username: username, password: password };
};

const userInfoInputtedReqBody = (req: Request, userId: number) => {
  const { firstName, lastName, email, phone } = req.body;
  return { user_id: userId, first_name: firstName, last_name: lastName, email: email, phone: phone };
};

const retrieveUserByUserName = async (username: string): Promise<User> => {
  const userArray: User[] = await userAuth.findUser('user.username', username);
  return userArray[0];
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_USER);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newUser = userInputtedReqBody(req);
    const userFound: User = await retrieveUserByUserName(newUser.username);
    if (userFound) {
      res.status(400).send(userDoesExist);
    } else {
      newUser.password = await authConfig.hashPassword(newUser.password);
      const createdUser: User | UserInfo | undefined = await insertItem(req, res, next, NAMESPACE, TABLE_USER, newUser);
      const newlyCreatedUser: User = await retrieveUserByUserName(newUser.username);
      const createdUserInfo: User | UserInfo | undefined = await insertItem(req, res, next, NAMESPACE, TABLE_USER_INFO, userInfoInputtedReqBody(req, newlyCreatedUser.id));
      res.status(201).send([{ user: createdUser }, { user_info: createdUserInfo }]);
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getUsers, createUser };
