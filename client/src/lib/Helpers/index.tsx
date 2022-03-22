import { omitBy, isNil } from "lodash";

export const getMonthYear = (timestamp: number) => {
  const date = new Date(timestamp);
  return monthConverter(date.getMonth() + 1) + " " + date.getFullYear();
};

export const getYear = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.getFullYear();
};

export const getRangeYear = (
  firstTimestamp: number,
  secondTimestamp: number,
  current?: boolean
) => {
  const firstDate = new Date(firstTimestamp);
  const secondDate = new Date(secondTimestamp);
  const firstYear = getYear(firstTimestamp);
  const secondYear = getYear(secondTimestamp);
  if (current) {
    return (
      monthConverter(firstDate.getMonth()) + " " + firstYear + " - Present"
    );
  }
  if (firstYear === secondYear) {
    return (
      monthConverter(firstDate.getMonth()) +
      " - " +
      monthConverter(secondDate.getMonth()) +
      " " +
      firstYear
    );
  }
  return (
    monthConverter(firstDate.getMonth()) +
    " " +
    firstYear +
    " - " +
    monthConverter(secondDate.getMonth()) +
    " " +
    secondYear
  );
};

export const monthConverter = (month: number) => {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  return monthArr[month];
};

export const htmlDateFormat = (timestamp: number) => {
  const date = new Date(timestamp);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate()
  );
};

export const removeEmpty = (obj: any) => {
  return omitBy(obj, isNil);
};

export const htmlDateToUnix = (timestamp: number) =>
  Math.floor(new Date(timestamp).getTime() / 1000) * 1000;
