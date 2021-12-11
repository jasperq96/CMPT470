import { Knex } from 'knex';
import { Column } from '../../src/db/models/columnModel';
import { generateUUID } from '../../src/utils/generateUUID';

export async function insertColumn(knex: Knex): Promise<void> {
  let columnSeed: Column[] = [];
  const columnTitles: string[] = ['To-Do', 'In-Progress', 'Complete'];

  // For the three default users, create three columns each
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newColumn: Column = {
        id: generateUUID(),
        user_id: i + 1,
        title: columnTitles[j],
        col_order: j
      };
      columnSeed.push(newColumn);
    }
  }

  await knex('column').insert(columnSeed);
}
