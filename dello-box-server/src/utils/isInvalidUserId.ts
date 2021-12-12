import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';

export const isInvalidUserId = async (userId: number) => {
  // Check if userId is a negative number or not a number (NaN)
  if (isInvalidInput(userId) || isNaN(userId)) {
    return true;
  }
  const retrievedUser = await Knex.select('*').from('user').where('id', userId);
  // Check if userId is associated with a user
  if (!retrievedUser.length) {
    return true;
  }
  return false;
};
