import chai from 'chai';
import _ from 'lodash';

import { holidaysV1 } from '../../src/reducers';
const expect = chai.expect;

describe('#holidaysV1', () => {

  it('must translate an year for Version 1 of the API', () => {
    let base = [{
      'mes': 'enero',
      '01': 'code02'
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
      '01': 'code01'
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

    let expected = [
      { dia: 1, mes: 1, code: 'code01'},
      { dia: 1, mes: 1, code: 'code02'},

      { dia: 3, mes: 2, code: 'code03'},
      { dia: 12, mes: 2, code: 'code04'},

      { dia: 22, mes: 3, code: 'code05'},

      { dia: 5, mes: 4, code: 'code06'},
      { dia: 6, mes: 4, code: 'code06'},
      { dia: 7, mes: 4, code: 'code06'},

      { dia: 5, mes: 5, code: 'code08'},
      { dia: 6, mes: 5, code: 'code07'},
      { dia: 6, mes: 5, code: 'code08'},
      { dia: 7, mes: 5, code: 'code08'}
    ];

    let result = holidaysV1(base, holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
