import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('column', (table: Knex.CreateTableBuilder) => {
    table.text('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
    table.string('title').notNullable();
    table.integer('col_order').unsigned().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('column');
}
