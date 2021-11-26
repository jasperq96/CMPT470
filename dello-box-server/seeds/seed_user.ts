import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user').del();

  await knex('user').insert([
    { id: 1, username: 'username1', password: '$2a$12$0lBh9mvxs8lOvLhhd7MHF.Cwx1O9AvCP748sy9Pnd.w00U35K5aiy' },
    { id: 2, username: 'username2', password: '$2a$12$Zi9gW10jTmg5wfmtxPSOiOgEIuZF1ZSv/yZKWkPChmYFqxbptiJtO' }
  ]);
}
