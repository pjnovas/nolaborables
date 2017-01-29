import chai from 'chai';
import _ from 'lodash';

import { list } from 'lib/loaders';
const expect = chai.expect;

describe('#list', () => {

  it('must load data of an year for Version 2 of the API as a LIST', () => {

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
      	'religion': 'judaísmo',

        override: 999
      },
      'code06': {
        'motivo': 'Feriado 6',
        'tipo': 'trasladable',
      	'original': '08-04'
      }
    };

    let holidays = [
      { dia: 1, mes: 1, id: 'code01'},
      { dia: 1, mes: 1, id: 'code02'},

      { dia: 3, mes: 2, id: 'code03'},
      { dia: 12, mes: 2, id: 'code04'},

      { dia: 22, mes: 3, id: 'code05', override: 100 },

      { dia: 5, mes: 4, id: 'code06'}
    ];

    let expected = [{
      ...refs['code01'],
      ...holidays[0]
    }, {
      ...refs['code02'],
      ...holidays[1]
    }, {
      ...refs['code03'],
      ...holidays[2]
    }, {
      ...refs['code04'],
      ...holidays[3]
    }, {
      ...refs['code05'],
      ...holidays[4]
    }, {
      ...refs['code06'],
      ...holidays[5]
    }];

    let result = list(holidays, refs);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
