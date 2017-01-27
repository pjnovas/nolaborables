import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import _ from 'lodash';
import moment from 'moment';

import server from 'lib/index';

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiHttp);

const baseURL = '/api/v1';

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
      dia: 1,
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
