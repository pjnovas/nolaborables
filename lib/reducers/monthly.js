import {isObject, without} from 'lodash';
import spreadDays from './spreadDays';

export default function(year) {
  let holidays = spreadDays(year);

  return holidays.reduce( (result, month) => {
    let days = without(Object.keys(month), 'mes');

    result.push(
      days.reduce( (rMonth, day) => {
        const _day = Number(day).toString();

        if (Array.isArray(month[day])) { // same day has 2 holidays
          rMonth[_day] = month[day].map( d => {
            return isObject(d) ? Object.assign({}, d) : {id: d};
          })
        }
        else {
          rMonth[_day] = isObject(month[day]) ? Object.assign({}, month[day]) : {id: month[day]};
        }

        return rMonth;
      }, {})
    );

    return result;
  }, []);
}
