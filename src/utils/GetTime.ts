import { ReformatDate } from "@/utils/ReformatDate";

export const getTimeGame = (started: number) => {
  const now = Date.now();
  const reformatDateStarted = ReformatDate(started);
  const [startedHours, startedMinutes] = reformatDateStarted.split(":");
  const reformatDateNow = ReformatDate(now);
  const [nowHours, nowMinutes] = reformatDateNow.split(":");

  let resultHours = Number(nowHours) - Number(startedHours);
  let resultMinutes = Number(nowMinutes) - Number(startedMinutes);
  let hours = String(resultHours);
  let minutes = String(resultMinutes);

  if (resultHours < 10) {
    hours = "0" + resultHours;
  }
  if (resultMinutes < 10) {
    minutes = "0" + resultMinutes;
  }
  return hours + ":" + minutes;
};
