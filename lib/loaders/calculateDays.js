const week = [,'monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const positions = ['first', 'second', 'third'];

const getDate = (key, month, year) => {
  var date = new Date(year, month, 7);
  let [ pos, weekDay ] = key.split('_');
  date.setDate(
    (7 * positions.indexOf(pos)) + (week.indexOf(weekDay) - date.getDay())
  );
  return date.getDate();
};

export default function(year, yearNumber) {
  return year.map( (month, mIdx) => {

    if (month.calculated){ // has calculations

      Object.keys(month.calculated).forEach( key => {
        const day = getDate(key, mIdx, yearNumber);
        const value = month.calculated[key];

        if (month[day]){
          if (!Array.isArray(month[day])) {
            month[day] = [ month[day] ];
          }
          month[day].push(value);
        }
        else {
          month[day] = value;
        }
      });

      delete month.calculated;
    }

    return month;
  });
}
