import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_info', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable(); //maybe int to eliminate
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_info');
}
