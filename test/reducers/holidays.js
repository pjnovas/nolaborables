import chai from 'chai';
import _ from 'lodash';
import { holidays } from 'lib/reducers';
const expect = chai.expect;

const holidaysData = {
  'h2020': [{
    "mes": "enero",
    "01": "año-nuevo"
  },{
    "mes": "febrero",
    "24,25": "carnaval"
  }],
  future: [{
    "mes": "enero",
    "01": "año-nuevo"
  }],
};

describe('#holidays', () => {

  it('must return holidays for the given year', () => {
    let result = holidays(holidaysData, 2020);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(holidaysData.h2020.length);

    expect(_.isEqual(result, holidaysData.h2020)).to.be.true;
  });

  it('must return future common holidays for an undefined year', () => {
    let result = holidays(holidaysData, 2024);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(holidaysData.future.length);

    expect(_.isEqual(result, holidaysData.future)).to.be.true;
  });
});
