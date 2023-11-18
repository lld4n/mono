export function getGameTime(time1: number, time2: number): string {
  const time1Date = new Date(time1);
  const time2Date = new Date(time2);
  const result = time2Date.getTime() - time1Date.getTime();
  const dateMinutes = Math.ceil(result / (1000 * 60));
  const dateHours = Math.floor(dateMinutes / 60);
  const remainingMinutes = dateMinutes % 60;
  return (
    (dateHours < 10 ? '0' + dateHours : dateHours) +
    ':' +
    (remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes)
  );
}
