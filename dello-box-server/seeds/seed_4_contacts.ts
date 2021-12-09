import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('contact_list').del();

  // Inserts seed entries
  await knex('contact_list').insert([{ user_id: 1 }, { user_id: 2, contacts: [1, 4] }, { user_id: 3 }]);
}
