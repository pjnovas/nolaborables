import chai from 'chai';
import _ from 'lodash';
import { holidaysV2 } from '../../src/reducers';
const expect = chai.expect;

describe('#holidaysV2', () => {

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
      '01': [{ code: 'code01' }, { code: 'code02' }]
    }, {
      '03': { code: 'code03' },
      '12': { code: 'code04' }
    }, {
      '22': { code: 'code05' }
    }, {
      '05': { code: 'code06' },
      '06': { code: 'code06' },
      '07': { code: 'code06' }
    }, {
      '05': { code: 'code08' },
      '06': [{ code: 'code07' }, { code: 'code08' }],
      '07': { code: 'code08' }
    }];

    let result = holidaysV2(base, holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
