import {
  next,
  current,
  year
} from 'lib/controller/v1';

const BASE = '/api/v1';

export default [
  { method: 'GET', path: `${BASE}/proximo`, config: next },
  { method: 'GET', path: `${BASE}/actual`, config: current },
  { method: 'GET', path: `${BASE}/{year}`, config: year }
];
