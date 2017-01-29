import chai from 'chai';
import chaiHttp from 'chai-http';

import _ from 'lodash';

import {calculateDays} from 'lib/loaders';
import {festive} from 'lib/reducers';
import festiveData from 'lib/data/dias_festivos.json';
import festiveAnualData from 'lib/data/dias_festivos_anuales.json';

import server from 'lib/index';

const expect = chai.expect;
chai.use(chaiHttp);

const baseURL = '/api/v2/festivos';

const tryYear = (year, expected) => {
  return new Promise( resolve => {

    if (!expected){
      expected = festive(calculateDays(festiveData, year, festiveAnualData));
    }

    chai.request(server.listener).get(`${baseURL}/${year}`).end((err, res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      expect(_.isEqual(res.body, expected)).to.be.true;
      resolve();
    });

  });
};

describe('GET /{year}', () => {

  it('must return festive dates by year', async () => {
    for (var year=2011; year<=2017; year++) {
      await tryYear(year);
    }
  });

});
