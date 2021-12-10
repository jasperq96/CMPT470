import { Knex } from 'knex';
import { insertUser } from './insertSeeds/insert_user';
import { insertUserInfo } from './insertSeeds/insert_user_info';
import { insertTask } from './insertSeeds/insert_task';
import { insertContactList } from './insertSeeds/insert_contact_list';

export async function seed(knex: Knex): Promise<void> {
  // Disable foreign key check, delete tables, then enable again
  await knex.raw('ALTER TABLE "contact_list" DISABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "task" DISABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "user_info" DISABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "user" DISABLE TRIGGER ALL;');
  await knex('contact_list').del();
  await knex('task').del();
  await knex('user_info').del();
  await knex('user').del();
  await knex.raw('ALTER TABLE "user" ENABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "user_info" ENABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "task" ENABLE TRIGGER ALL;');
  await knex.raw('ALTER TABLE "contact_list" ENABLE TRIGGER ALL;');

  // Insert seed entries
  await insertUser(knex);
  await insertUserInfo(knex);
  await insertTask(knex);
  await insertContactList(knex);
}
