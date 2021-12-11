import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import userAuth from './requestTemplates/authUserController';
import authConfig from 'utils/authConfig';
import { authUserExists } from 'utils/authMessages';
import { getItems } from './requestTemplates/getAllRequest';
import { insertItem } from './requestTemplates/createRequest';
import { User } from 'db/models/userModel';
import { UserInfo } from 'db/models/userInfoModel';
import { Column } from 'db/models/columnModel';
import { userInfoDNEError } from 'utils/errorMessages';
import { deleteUser } from './requestTemplates/deleteUserById';
import controller from './fileController';
import { insertNewUserColumns } from './columnController';

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
  await getItems(req, res, next, NAMESPACE, TABLE_USER, 'id');
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newUser = userInputtedReqBody(req);
    const userFound: User = await retrieveUserByUserName(newUser.username);
    logging.error(NAMESPACE, 'User Found', userFound);
    if (userFound) {
      res.status(400).send(authUserExists);
    } else {
      newUser.password = await authConfig.hashPassword(newUser.password);
      const createdUser: User | UserInfo | undefined = await insertItem(req, res, next, NAMESPACE, TABLE_USER, newUser);
      const newlyCreatedUser: User = await retrieveUserByUserName(newUser.username);
      const createdUserInfo: User | UserInfo | undefined = await insertItem(req, res, next, NAMESPACE, TABLE_USER_INFO, userInfoInputtedReqBody(req, newlyCreatedUser.id));
      const createdColumns: Column[] = await insertNewUserColumns(newlyCreatedUser.id);
      res.status(201).send([{ user: createdUser }, { user_info: createdUserInfo }, { columns: createdColumns }]);
    }
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  logging.info(NAMESPACE, `REMOVING USER ${userId}`);
  try {
    const listOfUsersWithMeAdded = await Knex.select('*').from('contact_list').where('contact_list.user_id', '<>', userId);
    const updateNicknameForAllUsers = await Knex.select('user_id', 'contact_nicknames').from('user_info').where('user_id', '<>', userId);

    listOfUsersWithMeAdded.forEach(async (row: any) => {
      if (row['contacts'].includes(userId)) {
        const index = row['contacts'].indexOf(userId);
        row['contacts'].splice(index, 1);
        const editContactsByUserId = await Knex.update({ contacts: row['contacts'] }).into('contact_list').where('contact_list.user_id', '=', row['user_id']);
        if (!editContactsByUserId) {
          res.status(404).send(userInfoDNEError);
          return;
        }
      }
    });

    updateNicknameForAllUsers.forEach(async (row: any) => {
      row['contact_nicknames'] = JSON.parse(row['contact_nicknames']);
      if (row['contact_nicknames'].hasOwnProperty(String(userId))) {
        delete row['contact_nicknames'][String(userId)];
        var new_nicknames = [JSON.stringify(row['contact_nicknames'])];
        const editUserInfoByUserId = await Knex.update({ contact_nicknames: new_nicknames }).into('user_info').where('user_info.user_id', '=', row['user_id']);
        if (!editUserInfoByUserId) {
          res.status(404).send(userInfoDNEError);
          return;
        }
      }
    });

    await deleteUser(req, res, next, NAMESPACE, 'user_info');
    await deleteUser(req, res, next, NAMESPACE, 'contact_list');
    controller.deleteFileById;
    await deleteUser(req, res, next, NAMESPACE, 'file');
    await deleteUser(req, res, next, NAMESPACE, 'task');
    await deleteUser(req, res, next, NAMESPACE, 'user');

    const retrievedUsers = await Knex.select('*').from('user');
    if (!retrievedUsers) {
      res.status(404).send(userInfoDNEError);
      return;
    }
    logging.info(NAMESPACE, 'RETRIEVING REMAINING USERS', retrievedUsers);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getUsers, createUser, deleteUserByUserId };
