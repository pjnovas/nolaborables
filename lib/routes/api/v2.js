import {
  year
} from 'lib/controller/v2';

const BASE = '/api/v2';

export default [
  { method: 'GET', path: `${BASE}/feriados/{year}`, config: year }

  //{ method: 'GET', path: `${BASE}/festivos/actual`, config: current },
  //{ method: 'GET', path: `${BASE}/festivos/{year}`, config: next },
  //{ method: 'GET', path: `${BASE}/festivos/{year}/{month}`, config: year }
];
