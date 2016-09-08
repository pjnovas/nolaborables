import chai from 'chai';
import chaiHttp from 'chai-http';
import _ from 'lodash';

import { holidaysV1 as reducer } from '../../src/reducers';
import { holidaysV1 as loader } from '../../src/loaders';

import holidays, { fijos, ref } from '../../src/data/holidays';

import server from '../../src/index';
const expect = chai.expect;

chai.use(chaiHttp);

const baseURL = '/api/v1';

const tryYear = (year, expected) => {
  return new Promise( resolve => {

    if (!expected){
      const plain = reducer(fijos, holidays[`h${year}`]);
      expected = loader(plain, ref);
    }

    chai.request(server.listener).get(`${baseURL}/${year}`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(_.isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

describe('/api/v1/', () => {

  describe('GET /{year}', () => {

    it('must return holidays by year', async () => {
      await tryYear(2011);
      await tryYear(2012);
      await tryYear(2013);
      await tryYear(2014);
      await tryYear(2015);
      await tryYear(2016);
    });

    it('must return fixed holidays with a future year', async () => {
      const plain = reducer(fijos);
      const expected = loader(plain, ref);

      const nextYear = new Date().getFullYear() + 1;
      await tryYear(nextYear, expected);
    });

    it('must NOT return optional holidays when filter "excluir" is opcional');

  });

});
