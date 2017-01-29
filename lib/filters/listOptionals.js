
export default function(holidays) {
  return holidays.filter( holiday => !holiday.opcional);
}
