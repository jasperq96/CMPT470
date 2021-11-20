import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_info').del();

  await knex('user_info').insert([
    { id: 1, first_name: 'test1', last_name: 'dummy1', email: 'dummy1@hotmail.com', phone: '604 123 4567' },
    { id: 2, first_name: 'test2', last_name: 'dummy2', email: 'dummy2@gmail.com', phone: '604 123 4567' },
    { id: 3, first_name: 'test3', last_name: 'dummy3', email: 'dummy3@outlook.com', phone: '604 123 4567' }
  ]);
}
