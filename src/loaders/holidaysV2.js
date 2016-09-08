
export default function(year, refs) {
  return year.map( month => {

    return Object.keys(month).reduce( (_month, day) => {

      if (Array.isArray(month[day])){
        _month[day] = month[day].map( ({ id }) => {
          return { id, ...refs[id] };
        });
      }
      else {
        let id = month[day].id;
        _month[day] = { id, ...refs[id] };
      }

      return _month;
    }, {});

  });
}
