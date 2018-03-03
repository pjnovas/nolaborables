import chai from 'chai';
import _ from 'lodash';

import { list } from 'lib/reducers';
const expect = chai.expect;

describe('#list', () => {

  it('must reduce an year for Version 2 of the API as a LIST', () => {
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
    }, {
      'mes': 'junio',
      '30': 'same',
      '30,31': 'same2'
    }];

    let expected = [
      { dia: 1, mes: 1, id: 'code01'},
      { dia: 12, mes: 2, id: 'code04'},

      { dia: 22, mes: 3, id: 'code05'},

      { dia: 5, mes: 4, id: 'code06'},
      { dia: 6, mes: 4, id: 'code06'},
      { dia: 7, mes: 4, id: 'code06'},

      { dia: 5, mes: 5, id: 'code08'},
      { dia: 6, mes: 5, id: 'code08'},
      { dia: 7, mes: 5, id: 'code08'},

      { dia: 30, mes: 6, id: 'same'},
      { dia: 30, mes: 6, id: 'same2'},
      { dia: 31, mes: 6, id: 'same2'}
    ];

    let result = list(holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });

});
