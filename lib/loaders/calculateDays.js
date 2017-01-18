import _ from 'lodash'
const week = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const positions = ['first', 'second', 'third'];

const getDate = (key, month, year) => {
  const weekLen = week.length
  const initialDay = 1
  const firstWeekDay = new Date(year, month, initialDay).getDay();

  let [ pos, weekDay ] = key.split('_');
  weekDay = week.indexOf(weekDay)
  pos = positions.indexOf(pos)

  let sum = weekLen * pos
  let dif = 0

  if (firstWeekDay < weekDay) {
    dif = weekDay - firstWeekDay
  }
  else if (firstWeekDay > weekDay) {
    dif = weekDay + (weekLen - firstWeekDay)
  }

  return sum + dif + initialDay
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
