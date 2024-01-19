export default function getMonthsDaysDifference(
  startDate: Date,
  endDate: Date,
) {
  const difference = endDate.getTime() - startDate.getTime();
  const differentDays = Math.ceil(difference / (1000 * 3600 * 24));
  if (differentDays < 30) return `${differentDays}d`;
  else if (differentDays <= 365)
    return `${
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    }mo`;
  else
    return `${Math.abs(
      Math.round(difference / 1000 / (60 * 60 * 24) / 365.25),
    )}yr`;
}
