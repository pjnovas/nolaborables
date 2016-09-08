import _ from 'lodash';
import spreadDays from './spreadDays';

const sortDays = year => {
  year.sort( (a,b) => {
    let r = parseInt(a.mes, 10) - parseInt(b.mes, 10);

    if (r === 0) {
      r = parseInt(a.dia, 10) - parseInt(b.dia, 10);
    }

    if (r === 0){
      if(a.id < b.id) r = -1;
      if(a.id > b.id) r = 1;
    }
    return r;
  });
};

export default function(yearA, yearB) {
  let base = spreadDays(yearA);
  let holidays = yearB ? spreadDays(yearB) : [];

  let year = base.reduce( (result, month, mIdx) => {

    let days = _.union(Object.keys(month), Object.keys(holidays[mIdx] || {}));
    days = _.without(days, 'mes');

    days.forEach( day => {

      let _day = {
        dia: +day,
        mes: mIdx+1
      };

      if (month[day]){
        result.push({ ..._day, id: month[day] });
      }

      if (holidays[mIdx] && holidays[mIdx][day]){
        result.push({ ..._day, id: holidays[mIdx][day] });
      }
    });

    return result;
  }, []);

  sortDays(year);
  return year;
}
