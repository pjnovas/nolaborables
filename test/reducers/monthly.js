import chai from 'chai';
import _ from 'lodash';
import { monthly } from 'lib/reducers';
const expect = chai.expect;

describe('#monthly', () => {

  it('must translate an year for Version 2 of the API', () => {
    let base = [{
      'mes': 'enero',
      '01': 'code01'
    }, {
      'mes': 'febrero',
      '03': 'code03'
    }, {
      'mes': 'marzo'
    }, {
      'mes': 'abril'
    }, {
      'mes': 'mayo',
      '06': 'code07'
    }];

    let holidays = [{
      'mes': 'enero',
      '01': 'code02'
    }, {
      'mes': 'febrero',
      '12': 'code04'
    }, {
      'mes': 'marzo',
      '22': 'code05'
    }, {
      'mes': 'abril',
      '05,06,07': 'code06'
    }, {
      'mes': 'mayo',
      '05,06,07': 'code08'
    }];

    let expected = [{
      '1': [{ id: 'code01' }, { id: 'code02' }]
    }, {
      '3': { id: 'code03' },
      '12': { id: 'code04' }
    }, {
      '22': { id: 'code05' }
    }, {
      '5': { id: 'code06' },
      '6': { id: 'code06' },
      '7': { id: 'code06' }
    }, {
      '5': { id: 'code08' },
      '6': [{ id: 'code07' }, { id: 'code08' }],
      '7': { id: 'code08' }
    }];

    let result = monthly(base, holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });

  it('must allow to reduce only one year', () => {
    let base = [{
      'mes': 'enero',
      '01': 'code02'
    }, {
      'mes': 'febrero',
      '03': 'code03'
    }];

    let expected = [{
      '1': { id: 'code02' }
    }, {
      '3': { id: 'code03' }
    }];

    let result = monthly(base);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
