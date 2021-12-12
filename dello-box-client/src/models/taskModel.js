export const editTaskFieldsObject = (values) => {
  return {
    startDate: values.start_date,
    endDate: values.end_date,
    title: values.title,
    notes: values.notes
  };
};
