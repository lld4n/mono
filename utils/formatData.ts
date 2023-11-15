export default function formatData(data: string): string {
  const date = new Date(data);
  const resultData = date.getHours() + ':' + date.getMinutes();
  return resultData;
}
