import { Knex } from 'knex';

export async function insertUserInfo(knex: Knex): Promise<void> {
  await knex('user_info').insert([
    {
      user_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@hotmail.com',
      phone: '604-123-4567'
    },
    { user_id: 2, first_name: 'Jane', last_name: 'Doe', email: 'janedoe@gmail.com', phone: '604-123-4567', contact_nicknames: [{ '1': '', '3': '' }] },
    { user_id: 3, first_name: 'Bob', last_name: 'Marley', email: 'bmarley@gmail.com', phone: '604-123-4567', contact_nicknames: [{ '1': '', '2': '' }] }
  ]);
}
