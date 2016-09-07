import _ from 'lodash';
import spreadDays from './spreadDays';

export default function(yearA, yearB) {
  let base = spreadDays(yearA);
  let holidays = spreadDays(yearB);

  return base.reduce( (result, month, mIdx) => {

    let days = _.union(Object.keys(month), Object.keys(holidays[mIdx]));
    days = _.without(days, 'mes');

    result.push(
      days.reduce( (rMonth, day) => {

        if (month[day]){
          rMonth[day] = { code: month[day] };
        }

        if (holidays[mIdx] && holidays[mIdx][day]){
          let code = holidays[mIdx][day];

          if (rMonth[day]){
            rMonth[day] = [rMonth[day], { code }];
          }
          else {
            rMonth[day] = { code };
          }
        }

        return rMonth;
      }, {})
    );

    return result;
  }, []);
}
