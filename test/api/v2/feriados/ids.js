import chai from 'chai';
import chaiHttp from 'chai-http';
import _ from 'lodash';

import { ref } from 'lib/data/holidays';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v2/feriados';

describe('GET /ids', () => {

  it('must return holidays ids for reference', done => {
    chai.request(server.listener).get(`${baseURL}/ids`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(_.isEqual(res.body, ref)).to.be.true;
      done();
    });
  });

});
