import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task', (table: Knex.CreateTableBuilder) => {
    table.increments().primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
    table.text('col_id').notNullable().references('id').inTable('column');
    table.integer('index').unsigned().notNullable();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.string('title').notNullable();
    table.text('notes');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task');
}
