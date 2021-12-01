import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('task').del();

  await knex('task').insert([
    { id: 1, start_date: '2021-11-14T10:30:00', end_date: '2021-11-18T16:30:00', title: 'task1', notes: 'Some notes here' },
    { id: 2, start_date: '2021-11-16T09:00:00', end_date: '2021-11-24T18:30:00', title: 'task2', notes: '' }
  ]);
}
