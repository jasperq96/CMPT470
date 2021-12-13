export const editUserInfoObject = (values) => {
  return {
    firstName: values.first_name,
    lastName: values.last_name,
    email: values.email,
    phone: values.phone
  };
};
