// 日付が戻り値のutils関数の格納場所 prefixにdateを付与すること
import dayjs, { Dayjs } from "dayjs";

/**Postページなどで使用するタイムスタンプを、UI表示用の文字列に変換する */
export const dateFormatRelative = (target: Dayjs, fallback: string = "-"): string => {
  /**無効な値が入力されている場合はfallback文字列を返却する */
  if (!dayjs.isDayjs(target) || !target.isValid()) return fallback;
  const now = dayjs();
  const diffInMinutes = now.diff(target, "minute");
  const diffInHours = now.diff(target, "hour");
  const diffInDays = now.diff(target, "day");
  if (diffInMinutes < 1) return "たった今";
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;
  if (diffInHours < 24) return `${diffInHours}時間前`;
  if (diffInDays === 0) return "今日";
  if (diffInDays === 1) return "昨日";
  if (diffInDays < 7) return `${diffInDays}日前`;
  if (target.year() === now.year()) return target.format("MM月DD日");
  return target.format("YYYY年MM月DD日");
};

/**現在の日付時刻のタイムスタンプを返却する */
export const dateCurrentTimeStamp = (): string => {
  return dayjs().format("YYYY-MM-DDTHH:mm:ss");
};
