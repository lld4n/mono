export default function formatData(data: number): string {
  const date = new Date(data);
  return date.getHours() + ':' + date.getMinutes();
}
