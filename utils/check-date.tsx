export const checkDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Reset thời gian về 00:00:00 để chỉ so sánh ngày
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};
