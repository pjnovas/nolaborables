export default function(year) {

  return year.map( month => {
    return Object.keys(month).reduce( (newMonth, day) => {
      let curr = month[day];

      if (day.indexOf(',') > -1){
        day.split(',').forEach( d => {
          newMonth[d] = newMonth[d] ? [newMonth[d], curr] : curr
        });
      }
      else newMonth[day] = curr;

      return newMonth;
    }, {});

  });
}
