const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function convertDateToLocalDateFrench(date) {
  return new Date(date).toLocaleDateString("fr-FR", options);
}
