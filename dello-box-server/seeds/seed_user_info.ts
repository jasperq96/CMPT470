import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_info').del();

  await knex('user_info').insert([
    { id: 1, userId: 1, first_name: 'John', last_name: 'Doe', email: 'johndoe@hotmail.com', phone: '604-123-4567' },
    { id: 2, userId: 2, first_name: 'Jane', last_name: 'Doe', email: 'janedoe@gmail.com', phone: '604-123-4567' }
  ]);
}
