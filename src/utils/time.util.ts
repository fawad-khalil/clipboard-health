export function getUTCTime(date: Date): Date {
  const utcDate = new Date(date.getTime());
  
  utcDate.setUTCHours(utcDate.getUTCHours(), 0, 0, 0);
  
  return utcDate;
}
