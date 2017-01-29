import {
  byYear,
  references,
  festiveByYear
} from 'lib/controller/v2';

const BASE = '/api/v2';

export default [
  { method: 'GET', path: `${BASE}/feriados/ids`, config: references },
  { method: 'GET', path: `${BASE}/feriados/{year}`, config: byYear },
  { method: 'GET', path: `${BASE}/festivos/{year}`, config: festiveByYear }
];
