export const parseDateString = (dateString: string) => {
  const dateParts = dateString.split(/[\s,/:]+/);

  if (dateParts.length >= 5) {
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const hours = parseInt(dateParts[3], 10);
    const minutes = parseInt(dateParts[4], 10);

    return new Date(year, month, day, hours, minutes);
  }

  return new Date(dateString);
};

export const convertToDateTimeLocalString = (dateInput: string | Date) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};
