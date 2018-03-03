import chai from 'chai';
import chaiHttp from 'chai-http';

import {isEqual, isNumber} from 'lodash';

import { holidaysV1 as reducer } from 'lib/reducers';
import { holidaysV1 as loader } from 'lib/loaders';

import holidays, {ref} from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v1';

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
      const plain = reducer(holidays[`h${year}`]);
      expected = loader(plain, ref);
    }

    chai.request(server.listener).get(url).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

const getWithoutOptionals = year => {
  const plain = reducer(holidays[`h${year}`]);
  return loader(plain, ref).filter( h => !h.opcional);
};

describe('GET /{year}', () => {

  it('must return holidays by year', async () => {
    for (var year=2011; year<=2019; year++) {
      await tryYear(year);
    }
  });

  it('must return holidays without optionals', async () => {
    for (var year=2011; year<=2019; year++) {
      await tryYear(year, getWithoutOptionals(year), '?excluir=opcional');
    }
  });

  it('must return 404 on not filled future holidays', async () => {
    await tryYear(2080, 404);
  });

});
