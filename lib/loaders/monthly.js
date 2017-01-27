
export default function(year, refs) {
  return year.map( month => {

    return Object.keys(month).reduce( (_month, day) => {

      if (Array.isArray(month[day])){
        _month[day] = month[day].map(holiday =>
          Object.assign({}, refs[holiday.id], holiday)
        );
      }
      else {
        _month[day] = Object.assign({}, refs[month[day].id], month[day])
      }

      return _month;
    }, {});

  });
}
