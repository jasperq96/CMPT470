import { Knex } from 'knex';

export async function insertColumn(knex: Knex): Promise<void> {
  await knex('column').insert([
    { label: 'To-Do', order: 1 },
    { label: 'In Progress', order: 2 },
    { label: 'Complete', order: 3 }
  ]);
}
