import _ from 'lodash';
import spreadDays from './spreadDays';

export default function(yearA, yearB) {
  let base = spreadDays(yearA);
  let holidays = yearB ? spreadDays(yearB) : [];

  return base.reduce( (result, month, mIdx) => {

    let days = _.union(Object.keys(month), Object.keys(holidays[mIdx] || []));
    days = _.without(days, 'mes');

    result.push(
      days.reduce( (rMonth, day) => {
        const _day = parseInt(day, 10).toString();

        if (month[day]){
          rMonth[_day] = { id: month[day] };
        }

        if (holidays[mIdx] && holidays[mIdx][day]){
          let id = holidays[mIdx][day];

          if (rMonth[_day]){
            rMonth[_day] = [rMonth[_day], { id }];
          }
          else {
            rMonth[_day] = { id };
          }
        }

        return rMonth;
      }, {})
    );

    return result;
  }, []);
}
