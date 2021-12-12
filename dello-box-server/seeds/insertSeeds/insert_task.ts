import { Knex as typeKnex } from 'knex';
import { Knex } from '../../src/config/postgres';
import logging from '../../src/config/logging';
import { Column } from '../../src/db/models/columnModel';

export async function insertTask(knex: typeKnex): Promise<void> {
  const tasksForColumnOne = [
    { index: 0, start_date: '2021-11-14T10:30:00', end_date: '2021-11-18T16:30:00', title: 'task1', notes: 'Some notes here' },
    { index: 1, start_date: '2021-11-16T09:00:00', end_date: '2021-11-24T18:30:00', title: 'task2', notes: 'Giggity' },
    { index: 2, start_date: '2021-11-13T10:30:00', end_date: '2021-11-19T16:30:00', title: 'task3', notes: 'More notes here' }
  ];
  const tasksForColumnTwo = [
    { index: 0, start_date: '2021-11-17T09:00:00', end_date: '2021-11-25T18:30:00', title: 'task4', notes: 'Blah blah blah' },
    { index: 1, start_date: '2021-11-19T09:00:00', end_date: '2021-12-01T18:30:00', title: 'task5', notes: 'NONONO' },
    { index: 2, start_date: '2021-11-21T10:30:00', end_date: '2021-12-04T16:30:00', title: 'task6', notes: 'Testing' }
  ];
  const tasksForColumnThree = [{ index: 0, start_date: '2021-11-24T09:00:00', end_date: '2021-12-07T18:30:00', title: 'task7', notes: 'Wow' }];

  const columnSeed: Column[] = await Knex.select('*').from('column').orderBy('user_id').orderBy('col_order');
  let taskSeed: any[] = [];

  for (let i = 0; i < 3; i++) {
    let taskSeed1 = tasksForColumnOne.map((task: any) => {
      return { user_id: i + 1, col_id: columnSeed[0 + i * 3].id, ...task };
    });
    let taskSeed2 = tasksForColumnTwo.map((task: any) => {
      return { user_id: i + 1, col_id: columnSeed[1 + i * 3].id, ...task };
    });
    let taskSeed3 = tasksForColumnThree.map((task: any) => {
      return { user_id: i + 1, col_id: columnSeed[2 + i * 3].id, ...task };
    });
    let taskSeedAll = taskSeed1.concat(taskSeed2, taskSeed3);
    taskSeed.push(...taskSeedAll);
  }

  await knex('task').insert(taskSeed);
}
