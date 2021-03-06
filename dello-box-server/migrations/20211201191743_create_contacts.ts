import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contact_list', (table: Knex.CreateTableBuilder) => {
    table.increments().primary();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('user');
    table.specificType('contacts', 'integer ARRAY').defaultTo('{}');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('contact_list');
}
