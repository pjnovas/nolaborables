import chai from 'chai';
import chaiHttp from 'chai-http';

import _ from 'lodash';

import { holidaysV1 as reducer } from 'lib/reducers';
import { holidaysV1 as loader } from 'lib/loaders';

import holidays, { ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v1';

describe('GET /actual', () => {
  const actualYear = new Date().getFullYear();

  it('must return holidays for the current year', done => {
    const plain = reducer(holidays[`h${actualYear}`]);
    const expected = loader(plain, ref);

    chai
      .request(server.listener)
      .get(`${baseURL}/actual`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(_.isEqual(res.body, expected)).to.be.true;
        done();
      });
  });

  it('must NOT return optional holidays when filter "excluir" is opcional', done => {
    const plain = reducer(holidays[`h${actualYear}`]);
    const result = loader(plain, ref);

    const expected = result.filter( holiday => !holiday.opcional);

    chai
      .request(server.listener)
      .get(`${baseURL}/actual?excluir=opcional`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(_.isEqual(res.body, expected)).to.be.true;
        done();
      });
  });

});
