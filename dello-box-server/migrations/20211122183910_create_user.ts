import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table: Knex.CreateTableBuilder) => {
    table.increments().primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
