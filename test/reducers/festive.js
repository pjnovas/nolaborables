import chai from 'chai';
import _ from 'lodash';
import { festive } from 'lib/reducers';
const expect = chai.expect;

describe('#festive', () => {

  it('must reduce festive days', () => {
    let base = [{
      'mes': 'enero',
      '01': ['code01', 'code02']
    }, {
      'mes': 'febrero',
      '03': 'code03'
    }, {
      'mes': 'marzo'
    }];

    let expected = [{
      '1': ['code01', 'code02']
    }, {
      '3': 'code03'
    }, {

    }];

    let result = festive(base);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });

});
