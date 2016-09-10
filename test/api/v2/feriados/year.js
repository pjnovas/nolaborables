import chai from 'chai';
import chaiHttp from 'chai-http';

import _ from 'lodash';

import { holidaysV2 as reducer } from 'lib/reducers';
import { holidaysV2 as loader } from 'lib/loaders';
import { optionalsV2 as noOptionals } from 'lib/filters';

import holidays, { fijos, ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v2/feriados';

const tryYear = (year, expected, query) => {
  query = query || '';
  return new Promise( resolve => {

    if (!expected){
      // Default holidays are without optionals
      const plain = reducer(fijos, holidays[`h${year}`]);
      expected = noOptionals(loader(plain, ref));
    }

    chai.request(server.listener).get(`${baseURL}/${year}${query}`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      //expect(res.body.length).to.be.greaterThan(0);
      expect(_.isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

const getWithOptionals = year => {
  const plain = reducer(fijos, holidays[`h${year}`]);
  return loader(plain, ref);
};

describe('GET /{year}', () => {

  it('must return holidays by year', async () => {
    for (var year=2011; year<=2016; year++) {
      await tryYear(year);
    }
  });

  it('must return holidays with optionals', async () => {
    for (var year=2011; year<=2016; year++) {
      await tryYear(year, getWithOptionals(year), '?incluir=opcional');
    }
  });

  it('must return fixed holidays for a future year', async () => {
    const plain = reducer(fijos);
    const expected = noOptionals(loader(plain, ref));

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected);
  });

  it('must return fixed holidays with optionals for a future year', async () => {
    const plain = reducer(fijos);
    const expected = loader(plain, ref);

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected, '?incluir=opcional');
  });

});
