import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('column', (table: Knex.CreateTableBuilder) => {
    table.increments().primary();
    table.string('label').notNullable();
    table.integer('order').unsigned().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('column');
}
