import chai from 'chai';
import _ from 'lodash';
import { monthly } from 'lib/reducers';
const expect = chai.expect;

describe('#monthly', () => {

  it('must translate an year for Version 2 of the API Monthly', () => {
    let holidays = [{
      'mes': 'enero',
      '01': 'code02',
      '12': 'code04'
    }, {
      'mes': 'febrero'
    }, {
      'mes': 'marzo',
      '20': {id: 'code10', tipo: 'trasladable', original: '01-01'},
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
      '30,31': {id: 'same2'}
    }];

    let expected = [{
      '1': { id: 'code02' },
      '12': { id: 'code04' }
    }, {

    }, {
      '20': { id: 'code10', tipo: 'trasladable', original: '01-01' },
      '22': { id: 'code05' }
    }, {
      '5': { id: 'code06' },
      '6': { id: 'code06' },
      '7': { id: 'code06' }
    }, {
      '5': { id: 'code08' },
      '6': { id: 'code08' },
      '7': { id: 'code08' }
    }, {
      '30': [{ id: 'same' }, { id: 'same2' }],
      '31': { id: 'same2' }
    }];

    let result = monthly( holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });


});
