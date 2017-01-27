import chai from 'chai';
import _ from 'lodash';
import { monthly } from 'lib/loaders';
const expect = chai.expect;

describe('#monthly', () => {

  it('must load data of an year for Version 2 of the API Monthly', () => {
    let refs = {
      'code01': {
        'motivo': 'Feriado 1',
        'tipo': 'inamovible'
      },
      'code02': {
        'motivo': 'Feriado 2',
        'tipo': 'nolaborable',
        'opcional': 'origen',
        'origen': 'armenia'
      },
      'code03': {
        'motivo': 'Feriado 3',
        'tipo': 'puente'
      },
      'code04': {
        'motivo': 'Feriado 4',
        'tipo': 'nolaborable',
        'opcional': 'religion',
        'religion': 'cristianismo'
      },
      'code05': {
        'motivo': 'Feriado 5',
        'tipo': 'nolaborable',
      	'opcional': 'religion',
      	'religion': 'judaísmo'
      },
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
        'tipo': 'trasladable',
      	'original': '08-04'
      },
      'code09': {
        'motivo': 'Feriado 9',
        'tipo': 'inamovible'
      }
    };

    let holidays = [{
      '1': [{ id: 'code01' }, { id: 'code02' }]
    }, {
      '3': { id: 'code03' },
      '12': { id: 'code04' }
    }, {
      '10': { id: 'code09', tipo: 'trasladable', original: '15-03'},
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

    let expected = [{
      '1': [{ id: 'code01', ...refs['code01'] }, { id: 'code02', ...refs['code02'] }]
    }, {
      '3': { id: 'code03', ...refs['code03'] },
      '12': { id: 'code04', ...refs['code04'] }
    }, {
      '10': { id: 'code09', motivo: 'Feriado 9', tipo: 'trasladable', original: '15-03' },
      '22': { id: 'code05', ...refs['code05'] }
    }, {
      '5': { id: 'code06', ...refs['code06'] },
      '6': { id: 'code06', ...refs['code06'] },
      '7': { id: 'code06', ...refs['code06'] }
    }, {
      '5': { id: 'code08', ...refs['code08'] },
      '6': [{ id: 'code07', ...refs['code07'] }, { id: 'code08', ...refs['code08'] }],
      '7': { id: 'code08', ...refs['code08'] }
    }];

    let result = monthly(holidays, refs);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
