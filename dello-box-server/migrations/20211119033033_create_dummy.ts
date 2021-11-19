import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Dummy', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name').notNullable();
    table.string('description').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Dummy');
}
