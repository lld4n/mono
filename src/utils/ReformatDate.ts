export const ReformatDate = (value: number) => {
  const dat = new Date(value);
  let hours = String(dat.getHours());
  let minutes = String(dat.getMinutes());
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};
