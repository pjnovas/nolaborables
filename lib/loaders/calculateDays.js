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

export const getByDayOfYear = (year, day) => {
  const first = new Date(year, 0, 0);
  return new Date(first.setDate(first.getDate() + day));
}

const setDayValue = (month, day, value) => {
  if (month[day]){
    if (!Array.isArray(month[day])) {
      month[day] = [ month[day] ];
    }
    month[day].push(value);
  }
  else {
    month[day] = value;
  }
}

export default function(year, yearNumber, yearDays = {}) {
  const parsed = year.map( (month, mIdx) => {
    const newMonth = _.cloneDeep(month);

    if (newMonth.calculated){ // has calculations
      Object.keys(newMonth.calculated).forEach( key => {
        const day = getDate(key, mIdx, yearNumber);
        const value = newMonth.calculated[key];
        setDayValue(newMonth, day, value)
      });

      delete newMonth.calculated;
    }

    return newMonth;
  });

  Object.keys(yearDays).forEach(key => {
    const dt = getByDayOfYear(yearNumber, Number(key));
    setDayValue(parsed[dt.getMonth()], dt.getDate(), yearDays[key]);
  });

  return parsed;
}
