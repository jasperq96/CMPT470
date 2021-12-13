export const editTaskFieldsObject = (values, startDate, endDate) => {
  return {
    startDate: startDate,
    endDate: endDate,
    title: values.title,
    notes: values.notes
  };
};
