import { Knex } from 'knex';
import { Column } from '../../src/db/models/columnModel';
import { generateUUID } from '../../src/utils/generateUUID';

export async function insertColumn(knex: Knex): Promise<void> {
  const columnSeed: Column[] = [];
  const columnTitles: string[] = ['To-Do', 'In-Progress', 'Complete'];

  for (let i = 0; i < 3; i++) {
    const newColumn: Column = {
      id: generateUUID(),
      user_id: i + 1,
      title: columnTitles[i],
      col_order: i
    };
    columnSeed.push(newColumn);
  }

  await knex('column').insert(columnSeed);
}
