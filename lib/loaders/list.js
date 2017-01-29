
export default function(holidays, refs) {
  return holidays.map( holiday => {
    return { ...refs[holiday.id], ...holiday };
  });
}
