/*
import chai from 'chai';
import chaiHttp from 'chai-http';

const server = require('../src/index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API v1', () => {

  describe('GET /{year}', () => {

    it('must return holidays by year', done => {
      chai.request(server.listener)
        .get('/2011')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');

          let holidays = res.body;



          done();
        });
    });
  });

});
*/
