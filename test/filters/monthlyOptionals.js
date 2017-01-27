import chai from 'chai';
import _ from 'lodash';

import { monthlyOptionals } from 'lib/filters';
const expect = chai.expect;

describe('#monthlyOptionals', () => {

  it('must remove optional holidays for Version 2 of the API Monthly', () => {

    let refs = {
      'code06': {
        'motivo': 'Feriado 6',
        'tipo': 'trasladable',
      	'original': '08-04'
      },
      'code07': {
        'motivo': 'Feriado 7',
        'tipo': 'trasladable',
      	'original': '08-04'
      },
      'code08': {
        'motivo': 'Feriado 8',
        'tipo': 'nolaborable',
        'opcional': 'religion',
        'religion': 'cristianismo'
      }
    };

    let holidays = [{
      '1': [{
        id: 'code01',
        'motivo': 'Feriado 1',
        'tipo': 'inamovible'
      },{
        id: 'code02',
        'motivo': 'Feriado 2',
        'tipo': 'nolaborable',
        'opcional': 'origen',
        'origen': 'armenia'
      }]
    }, {
      '3': {
        id: 'code03',
        'motivo': 'Feriado 3',
        'tipo': 'puente'
      },
      '12': {
        id: 'code04',
        'motivo': 'Feriado 4',
        'tipo': 'nolaborable',
        'opcional': 'religion',
        'religion': 'cristianismo'
      }
    }, {
      '22': {
        id: 'code05',
        'motivo': 'Feriado 5',
        'tipo': 'nolaborable',
      	'opcional': 'religion',
      	'religion': 'judaísmo'
      }
    }, {
      '5': { id: 'code06', ...refs['code06'] },
      '6': { id: 'code06', ...refs['code06'] },
      '7': { id: 'code06', ...refs['code06'] }
    }, {
      '5': { id: 'code08', ...refs['code08'] },
      '6': [{ id: 'code07', ...refs['code07'] }, { id: 'code08', ...refs['code08'] }],
      '7': [
        { id: 'code06', ...refs['code06'] },
        { id: 'code07', ...refs['code07'] },
        { id: 'code08', ...refs['code08'] }
      ]
    }, {
      '2': [
        { id: 'code08', ...refs['code08'] }
      ]
    }];

    let expected = [{
      '1': holidays[0][1][0]
    }, {
      '3': holidays[1][3]
    }, {
      // no holidays for March
    }, {
      '5': { id: 'code06', ...refs['code06'] },
      '6': { id: 'code06', ...refs['code06'] },
      '7': { id: 'code06', ...refs['code06'] }
    }, {
      '6': { id: 'code07', ...refs['code07'] },
      '7': [
        { id: 'code06', ...refs['code06'] },
        { id: 'code07', ...refs['code07'] }
      ]
    }, {

    }];

    let result = monthlyOptionals(holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
