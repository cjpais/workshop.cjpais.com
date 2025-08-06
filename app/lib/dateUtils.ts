import { parse, format } from "date-fns";

export const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const parsedDate = parse(date, "EEEE MMMM do, yyyy", new Date());
  return format(parsedDate, "MMM yyyy");
};

export const formatDateRange = (startDate: string, endDate: string) => {
  const parsedStartDate = parse(startDate, "MMMM yyyy", new Date());
  const parsedEndDate = parse(endDate, "MMMM yyyy", new Date());

  const formattedStart = format(parsedStartDate, "MMM yyyy");
  const formattedEnd = format(parsedEndDate, "MMM yyyy");

  if (formattedStart === formattedEnd) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
};

export const formatPostDate = (
  date?: string,
  startDate?: string,
  endDate?: string,
): string => {
  if (startDate && endDate) {
    return formatDateRange(startDate, endDate);
  }

  if (startDate && !endDate) {
    // Ongoing project
    const parsedStartDate = parse(startDate, "MMMM yyyy", new Date());
    const formattedStart = format(parsedStartDate, "MMM yyyy");
    return `${formattedStart} - now`;
  }

  if (date) {
    return formatDate(date);
  }

  return "";
};
