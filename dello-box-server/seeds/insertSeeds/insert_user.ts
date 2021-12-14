import { Knex } from 'knex';
import { generateUUID } from '../../src/utils/generateUUID';

export async function insertUser(knex: Knex): Promise<void> {
  await knex('user').insert([
    { username: 'username1', password: '$2a$12$0lBh9mvxs8lOvLhhd7MHF.Cwx1O9AvCP748sy9Pnd.w00U35K5aiy', uuid: generateUUID() },
    { username: 'username2', password: '$2a$12$Zi9gW10jTmg5wfmtxPSOiOgEIuZF1ZSv/yZKWkPChmYFqxbptiJtO', uuid: generateUUID() },
    { username: 'username3', password: '$2a$12$GMvMTCJL/BimteUPpZn10Or969IORbClEPWs80ZMG2y9d3m1Lo00W', uuid: generateUUID() }
  ]);
}
