import { ReformatDate } from "@/utils/ReformatDate";

export const GetTimeGame = (started: number) => {
  //учитываю часовой пояс короче, а то я чёт в ахуе был когда вместо 00:01 видел 03:01
  const timeZoneOffset = new Date().getTimezoneOffset();
  const localStarted = started - timeZoneOffset * 60 * 1000;
  const date = Date.now() - localStarted;
  return ReformatDate(date);
};
