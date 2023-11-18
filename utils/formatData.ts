export default function formatData(data: number): string {
  const date = new Date(data);
  console.log(date);
  return (
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  );
}
