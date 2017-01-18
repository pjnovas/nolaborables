import _ from 'lodash'
const week = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const positions = [,'first', 'second', 'third'];

const getDate = (key, month, year) => {
  var firstDay = new Date(year, month, 1);
  var date = new Date(year, month, 7);

  let [ pos, weekDay ] = key.split('_');
  weekDay = week.indexOf(weekDay)
  pos = positions.indexOf(pos)
  
  let sum = 7 * pos
  if (firstDay.getDay() === weekDay && weekDay > 0) {
    sum -= 7;
  }

  date.setDate(sum + (weekDay - date.getDay()));
  return date.getDate();
};

export default function(year, yearNumber) {
  return year.map( (month, mIdx) => {
    const newMonth = _.cloneDeep(month)

    if (newMonth.calculated){ // has calculations

      Object.keys(newMonth.calculated).forEach( key => {
        const day = getDate(key, mIdx, yearNumber);
        const value = newMonth.calculated[key];

        if (newMonth[day]){
          if (!Array.isArray(newMonth[day])) {
            newMonth[day] = [ newMonth[day] ];
          }
          newMonth[day].push(value);
        }
        else {
          newMonth[day] = value;
        }
      });

      delete newMonth.calculated;
    }

    return newMonth;
  });
}
