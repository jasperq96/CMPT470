import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('dummy').del();

  await knex('dummy').insert([
    { id: 1, name: 'Dummy1', description: 'This is Dummy1' },
    { id: 2, name: 'Dummy2', description: 'This is Dummy2' },
    { id: 3, name: 'Dummy3', description: 'This is Dummy3' }
  ]);
}
