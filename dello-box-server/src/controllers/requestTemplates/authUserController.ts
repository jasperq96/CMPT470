import { Knex } from '../../config/postgres';

const findUser = (columnName: string, val: any) => {
  return Knex('user')
    .select(['user.id', 'user.username', 'user.password'])
    .where(Knex.raw('?? = ?', [columnName, val]))
    .returning('*');
};

export default {
  findUser
};
