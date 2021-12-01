import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_info', (table: Knex.CreateTableBuilder) => {
    table.increments().primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_info');
}
