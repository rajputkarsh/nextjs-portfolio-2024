import { SHORT_MONTHS } from "@/constants/common";
import dayjs from "dayjs";

export const cloneDeep = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const removeHyphens = (text: string): string => {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "-") {
      const nextChar = text.charAt(i + 1);
      if (nextChar) {
        newText += nextChar.toUpperCase();
        i++;
      }
    } else {
      newText += text[i];
    }
  }
  return newText;
};

export const capitalize = (str: string): string => {
  if (!str) return str;
  return str
    .replaceAll("_", " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.toLowerCase().substring(1))
    .join(" ");
};

export const formatDate = (
  isoDate: string,
  dateOnly: boolean = false
): string => {
  const dateObject = dayjs(isoDate);
  const month = capitalize(SHORT_MONTHS[dateObject.month() + 1]);
  const hours =
    dateObject.hour() > 12 ? dateObject.hour() - 12 : dateObject.hour();

  let amPm = dateObject.hour() >= 12 ? "PM" : "AM";
  amPm = dateObject.hour() === 12 && dateObject.minute() == 0 ? "NOON" : amPm;

  return dateOnly
    ? `${month} ${dateObject.date()}, ${dateObject.year()}`
    : `${month} ${dateObject.date()}, ${dateObject.year()} - ${hours}:${dateObject.minute()} ${amPm}`;
};
