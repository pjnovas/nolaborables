import chai from 'chai';
import chaiHttp from 'chai-http';

import _ from 'lodash';

import { holidaysV1 as reducer } from 'lib/reducers';
import { holidaysV1 as loader } from 'lib/loaders';

import holidays, { fijos, ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v1';

const tryYear = (year, expected, query) => {
  query = query || '';
  return new Promise( resolve => {

    if (!expected){
      const plain = reducer(fijos, holidays[`h${year}`]);
      expected = loader(plain, ref);
    }

    chai.request(server.listener).get(`${baseURL}/${year}${query}`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(_.isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

const getWithoutOptionals = year => {
  const plain = reducer(fijos, holidays[`h${year}`]);
  return loader(plain, ref).filter( h => !h.opcional);
};

describe('GET /{year}', () => {

  it('must return holidays by year', async () => {
    for (var year=2011; year<=2017; year++) {
      await tryYear(year);
    }
  });

  it('must return holidays without optionals', async () => {
    for (var year=2011; year<=2017; year++) {
      await tryYear(year, getWithoutOptionals(year), '?excluir=opcional');
    }
  });

  it('must return fixed holidays for a future year', async () => {
    const plain = reducer(fijos);
    const expected = loader(plain, ref);

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected);
  });

  it('must return fixed holidays without optionals for a future year', async () => {
    const plain = reducer(fijos);
    const expected = loader(plain, ref).filter( h => !h.opcional);

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected, '?excluir=opcional');
  });


});
