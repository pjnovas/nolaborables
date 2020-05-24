import { get } from 'lodash';

export default function(holidays, year) {
  return get(holidays, `h${year}`, holidays.future);
}

