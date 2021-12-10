import { Knex } from 'knex';

export async function insertTask(knex: Knex): Promise<void> {
  await knex('task').insert([
    { user_id: 1, start_date: '2021-11-14T10:30:00', end_date: '2021-11-18T16:30:00', title: 'task1', notes: 'Some notes here' },
    { user_id: 2, start_date: '2021-11-16T09:00:00', end_date: '2021-11-24T18:30:00', title: 'task2', notes: '' },
    { user_id: 1, start_date: '2021-11-13T10:30:00', end_date: '2021-11-19T16:30:00', title: 'task3', notes: 'More notes here' },
    { user_id: 2, start_date: '2021-11-17T09:00:00', end_date: '2021-11-25T18:30:00', title: 'task4', notes: 'Blah blah blah' }
  ]);
}
