import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('task_info').del();

  let dateTime = new Date();
  await knex('task_info').insert([
    { id: 1, start_date: dateTime, end_date: dateTime, title: 'task1', notes: 'Some notes here', attachment: '' },
    { id: 2, start_date: dateTime, end_date: dateTime, title: 'task2', notes: '', attachment: '' }
  ]);
}
