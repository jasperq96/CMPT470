import { Knex } from 'knex';

export async function insertContactList(knex: Knex): Promise<void> {
  await knex('contact_list').insert([{ user_id: 1 }, { user_id: 2, contacts: [1, 4] }, { user_id: 3 }]);
}
