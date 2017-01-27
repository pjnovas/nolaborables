import _ from 'lodash';
import spreadDays from './spreadDays';

const sortDays = year => {
  year.sort( (a,b) => {
    let r = Number(a.mes) - Number(b.mes);

    if (r === 0) {
      r = Number(a.dia) - Number(b.dia);
    }

    if (r === 0){
      if(a.id < b.id) r = -1;
      if(a.id > b.id) r = 1;
    }
    return r;
  });
};

export default function(year) {
  let holidays = spreadDays(year);

  const yHolidays = holidays.reduce( (result, month, mIdx) => {
    let days = _.without(Object.keys(month), 'mes');

    days.forEach( day => {
      let _day = {
        dia: Number(day),
        mes: mIdx+1
      };

      const addDay = holiday => {
        result.push(
          Object.assign({}, _day, _.isObject(holiday) ? holiday : {id:holiday})
        );
      }

      if (Array.isArray(month[day])){
        month[day].forEach(addDay);
      } else {
        addDay(month[day]);
      }

    });

    return result;
  }, []);

  sortDays(yHolidays);
  return yHolidays;
}
