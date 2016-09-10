import moment from 'moment';

const week = [,'monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const positions = ['first', 'second', 'third'];

const getDate = (key, month, year) => {
  const date = moment(`01/${month}/${year}`, 'DD/MM/YYYY');
  let [ pos, weekDay ] = key.split('_');
  return date.day(week.indexOf(weekDay) + (7 * positions.indexOf(pos))).date();
};

export default function(year, yearNumber) {
  return year.map( (month, mIdx) => {

    if (month.calculated){ // has calculations

      Object.keys(month.calculated).forEach( key => {
        const day = getDate(key, mIdx+1, yearNumber);
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
