export const createUserObject = (values) => {
  return {
    username: values.username,
    password: values.password,
    firstName: values.firstname,
    lastName: values.lastname,
    email: values.email,
    phone: values.phonenumber
  };
};

export const deleteUserObject = (uuid) => {
  return {
    uuid: uuid
  };
};
