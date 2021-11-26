import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user').del();

  await knex('user').insert([
    { id: 1, username: 'username1', password: 'user1' },
    { id: 2, username: 'username2', password: 'user2' }
  ]);
}
