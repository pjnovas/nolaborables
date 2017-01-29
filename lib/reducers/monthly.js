import _ from 'lodash';
import spreadDays from './spreadDays';

export default function(year) {
  let holidays = spreadDays(year);

  return holidays.reduce( (result, month) => {
    let days = _.without(Object.keys(month), 'mes');

    result.push(
      days.reduce( (rMonth, day) => {
        const _day = Number(day).toString();
        rMonth[_day] = _.isObject(month[day]) ? Object.assign({}, month[day]) : {id: month[day]};
        return rMonth;
      }, {})
    );

    return result;
  }, []);
}
