import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task_info', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('title').notNullable();
    table.string('notes');
    table.string('attachment'); //this should be a link to a file
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task_info');
}
