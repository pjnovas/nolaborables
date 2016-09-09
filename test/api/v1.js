import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import _ from 'lodash';
import moment from 'moment';

import { holidaysV1 as reducer } from '../../src/reducers';
import { holidaysV1 as loader } from '../../src/loaders';

import holidays, { fijos, ref } from '../../src/data/holidays';

import server from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);
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

    it('must NOT return optional holidays when filter "excluir" is opcional', done => {
      const year = 2016;

      const plain = reducer(fijos, holidays[`h${year}`]);
      const result = loader(plain, ref);

      const expected = result.filter( holiday => !holiday.opcional);

      chai
        .request(server.listener)
        .get(`${baseURL}/${year}?excluir=opcional`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          expect(_.isEqual(res.body, expected)).to.be.true;
          done();
        });
    });

  });

  describe('GET /actual', () => {
    const actualYear = new Date().getFullYear();

    it('must return holidays for the current year', async () => {
      const plain = reducer(fijos, holidays[`h${actualYear}`]);
      const expected = loader(plain, ref);

      await tryYear('actual', expected);
    });

    it('must NOT return optional holidays when filter "excluir" is opcional', done => {
      const plain = reducer(fijos, holidays[`h${actualYear}`]);
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

  describe('GET /proximo', () => {

    it('must return next holiday', done => {
      const today = moment('28/04/2016 13:00', 'DD/MM/YYYY HH:mm');
      const clock = sinon.useFakeTimers(today.toDate().getTime());

      const expected = {
        dia: 29,
        mes: 4,
        motivo: 'Pascuas Judías',
      	tipo: 'nolaborable',
      	opcional: 'religion',
      	religion: 'judaísmo'
      };

      chai
        .request(server.listener)
        .get(`${baseURL}/proximo`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(_.isEqual(res.body, expected)).to.be.true;
          clock.restore();
          done();
        });
    });

    it('must NOT return next optional holiday if excluir is opcional', done => {
      const today = moment('28/04/2016 13:00', 'DD/MM/YYYY HH:mm');
      const clock = sinon.useFakeTimers(today.toDate().getTime());

      const expected = {
        dia: 5,
        mes: 5,
        motivo: 'Día del Trabajador',
      	tipo: 'inamovible'
      };

      chai
        .request(server.listener)
        .get(`${baseURL}/proximo?excluir=opcional`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(_.isEqual(res.body, expected)).to.be.true;
          clock.restore();
          done();
        });
    });

    it('must return New Year if there is not next holiday', done => {
      const today = moment('26/12/2016 13:00', 'DD/MM/YYYY HH:mm');
      const clock = sinon.useFakeTimers(today.toDate().getTime());

      const expected = {
        dia: 1,
        mes: 1,
        motivo: 'Año Nuevo',
      	tipo: 'inamovible'
      };

      chai
        .request(server.listener)
        .get(`${baseURL}/proximo`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(_.isEqual(res.body, expected)).to.be.true;
          clock.restore();
          done();
        });
    });

  });


});
