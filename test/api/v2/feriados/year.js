import chai from 'chai';
import chaiHttp from 'chai-http';

import _ from 'lodash';

import {
  monthly as reduceMonthly,
  list as reduceList
} from 'lib/reducers';

import {
  monthly as loadMonthly,
  list as loadList
} from 'lib/loaders';

import {
  monthlyOptionals as noOptionalsMonthly,
  listOptionals as noOptionalsList
} from 'lib/filters';

import holidays, { fijos, ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v2/feriados';

const tryYear = (year, expected, query) => {
  query = query || '';
  return new Promise( resolve => {

    if (!expected){
      // Default holidays are List and without optionals
      if (query.indexOf('formato=mensual') > -1){
        const plain = reduceMonthly(fijos, holidays[`h${year}`]);
        expected = noOptionalsMonthly(loadMonthly(plain, ref));
      }
      else {
        const plain = reduceList(fijos, holidays[`h${year}`]);
        expected = noOptionalsList(loadList(plain, ref));
      }
    }

    chai.request(server.listener).get(`${baseURL}/${year}${query}`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      expect(_.isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

const getWithOptionals = (year, list) => {
  if (list){
    const plain = reduceList(fijos, holidays[`h${year}`]);
    return loadList(plain, ref);
  }

  const plain = reduceMonthly(fijos, holidays[`h${year}`]);
  return loadMonthly(plain, ref);
};

describe('GET /{year}', () => {

  it('must return holidays by year', async () => {
    for (var year=2011; year<=2017; year++) {
      await tryYear(year);
    }
  });

  it('must return holidays with optionals', async () => {
    for (var year=2011; year<=2017; year++) {
      await tryYear(year, getWithOptionals(year, true), '?incluir=opcional');
    }
  });

  it('must return fixed holidays for a future year', async () => {
    const plain = reduceList(fijos);
    const expected = noOptionalsList(loadList(plain, ref));

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected);
  });

  it('must return fixed holidays with optionals for a future year', async () => {
    const plain = reduceList(fijos);
    const expected = loadList(plain, ref);

    const nextYear = new Date().getFullYear() + 1;
    await tryYear(nextYear, expected, '?incluir=opcional');
  });

  describe('?formato=mensual', () => {

    it('must return holidays by year', async () => {
      for (var year=2011; year<=2016; year++) {
        await tryYear(year, null, '?formato=mensual');
      }
    });

    it('must return holidays with optionals', async () => {
      for (var year=2011; year<=2016; year++) {
        await tryYear(year, getWithOptionals(year), '?formato=mensual&incluir=opcional');
      }
    });

    it('must return fixed holidays for a future year', async () => {
      const plain = reduceMonthly(fijos);
      const expected = noOptionalsMonthly(loadMonthly(plain, ref));

      const nextYear = new Date().getFullYear() + 1;
      await tryYear(nextYear, expected, '?formato=mensual');
    });

    it('must return fixed holidays with optionals for a future year', async () => {
      const plain = reduceMonthly(fijos);
      const expected = loadMonthly(plain, ref);

      const nextYear = new Date().getFullYear() + 1;
      await tryYear(nextYear, expected, '?formato=mensual&incluir=opcional');
    });

  });

});
