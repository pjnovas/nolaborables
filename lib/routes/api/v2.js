import {
  byYear,
  references
} from 'lib/controller/v2';

const BASE = '/api/v2';

export default [
  { method: 'GET', path: `${BASE}/feriados/ids`, config: references },
  { method: 'GET', path: `${BASE}/feriados/{year}`, config: byYear }

  //{ method: 'GET', path: `${BASE}/festivos/actual`, config: current },
  //{ method: 'GET', path: `${BASE}/festivos/{year}`, config: next },
  //{ method: 'GET', path: `${BASE}/festivos/{year}/{month}`, config: year }
];
