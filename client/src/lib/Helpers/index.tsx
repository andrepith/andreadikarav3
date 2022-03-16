export const getMonthYear = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  return monthConverter(date.getMonth() + 1) + " " + date.getFullYear();
};

export const getYear = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  return date.getFullYear();
};

export const getRangeYear = (
  firstTimestamp: string,
  secondTimestamp: string
) => {
  const firstDate = new Date(Number(firstTimestamp));
  const secondDate = new Date(Number(secondTimestamp));
  const firstYear = getYear(firstTimestamp);
  const secondYear = getYear(secondTimestamp);
  if (firstYear === secondYear) {
    return (
      monthConverter(firstDate.getMonth() + 1) +
      " - " +
      monthConverter(secondDate.getMonth() + 1) +
      " " +
      firstYear
    );
  }
  return (
    monthConverter(firstDate.getMonth() + 1) +
    " " +
    firstYear +
    " - " +
    monthConverter(secondDate.getMonth() + 1) +
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
