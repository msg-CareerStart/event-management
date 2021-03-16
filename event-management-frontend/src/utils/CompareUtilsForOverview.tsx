export const compareDates = (date_1: string, date_2: string): number => {
  let date1 = new Date(date_1);
  let date2 = new Date(date_2);

  if (date1 > date2) return 1;
  else if (date1 < date2) return -1;
  else return 0;
}

export const compareTimes = (time1: string, time2: string): number => {
  if (time1 > time2) return 1;
  else if (time1 < time2) return -1;
  else return 0;
}