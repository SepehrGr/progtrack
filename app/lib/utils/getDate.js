export function getDate(date) {
  return new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0, 0))
}
