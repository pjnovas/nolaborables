import chai from 'chai';
import chaiHttp from 'chai-http';

import {isEqual, isNumber} from 'lodash';

import {
  monthly as reduceMonthly,
  list as reduceList,
  holidays as reduceHolidays
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

    const holidaysToTest = reduceHolidays(holidays, year);

    if (!expected){
      // Default holidays are List and without optionals
      if (query.indexOf('formato=mensual') > -1){
        const plain = reduceMonthly(holidaysToTest);
        expected = noOptionalsMonthly(loadMonthly(plain, ref));
      }
      else {
        const plain = reduceList(holidaysToTest);
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
  const holidaysToTest = reduceHolidays(holidays, year);
  if (list){
    const plain = reduceList(holidaysToTest);
    return loadList(plain, ref);
  }

  const plain = reduceMonthly(holidaysToTest);
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

  it('must return common holidays for future years', async () => {
    const futureYear = new Date().getFullYear() + 10;
    await tryYear(futureYear);
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

    it('must return common holidays for future years', async () => {
      const futureYear = new Date().getFullYear() + 10;
      await tryYear(futureYear, getWithOptionals(futureYear), '?formato=mensual&incluir=opcional');
    });

  });

});
