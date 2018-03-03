import chai from 'chai';
import chaiHttp from 'chai-http';

import {isEqual, isNumber} from 'lodash';

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

import holidays, { ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v2/feriados';

const tryYear = (year, expected, query) => {
  query = query || '';
  let url = `${baseURL}/${year}${query}`
  return new Promise( resolve => {

    if (isNumber(expected)) {
      chai.request(server.listener).get(url).end((err, res) => {
        expect(res.status).to.be.equal(expected);
        resolve();
      });

      return;
    }

    if (!expected){
      // Default holidays are List and without optionals
      if (query.indexOf('formato=mensual') > -1){
        const plain = reduceMonthly(holidays[`h${year}`]);
        expected = noOptionalsMonthly(loadMonthly(plain, ref));
      }
      else {
        const plain = reduceList(holidays[`h${year}`]);
        expected = noOptionalsList(loadList(plain, ref));
      }
    }

    chai.request(server.listener).get(url).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      expect(isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

const getWithOptionals = (year, list) => {
  if (list){
    const plain = reduceList(holidays[`h${year}`]);
    return loadList(plain, ref);
  }

  const plain = reduceMonthly(holidays[`h${year}`]);
  return loadMonthly(plain, ref);
};

describe('GET /{year}', () => {

  it('must return holidays by year', async () => {
    for (var year=2011; year<=2019; year++) {
      await tryYear(year);
    }
  });

  it('must return holidays with optionals', async () => {
    for (var year=2011; year<=2019; year++) {
      await tryYear(year, getWithOptionals(year, true), '?incluir=opcional');
    }
  });

  it('must return 404 on not filled future holidays', async () => {
    await tryYear(2080, 404);
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

  });

});
