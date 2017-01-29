
export default function(holidays) {
  return holidays.reduce( (_year, month) => {

    _year.push(
      Object.keys(month).reduce( (_month, dayNbo) => {
        const monthDay = month[dayNbo];

        if (Array.isArray(monthDay)){

          const hs = monthDay.reduce( (_holidays, holiday) => {
            if (!holiday.opcional){
              _holidays.push(holiday);
            }
            return _holidays;
          }, []);

          if (hs.length > 0){
            _month[dayNbo] = (hs.length === 1 ? hs[0] : hs);
          }

          return _month;
        }

        if (!monthDay.opcional){
          _month[dayNbo] = monthDay;
        }

        return _month;
      }, {})
    );

    return _year;
  }, []);
}
