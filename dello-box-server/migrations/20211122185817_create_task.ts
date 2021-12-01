import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.string('title').notNullable();
    table.string('notes');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task');
}
