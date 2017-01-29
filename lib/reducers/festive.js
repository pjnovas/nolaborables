import _ from 'lodash';

export default function(year) {
  return year.reduce( (result, month,) => {
    const days = _.without(Object.keys(month), 'mes');

    result.push(
      days.reduce( (rMonth, day) => {
        rMonth[parseInt(day, 10).toString()] = month[day]
        return rMonth;
      }, {})
    );

    return result;
  }, []);
}
