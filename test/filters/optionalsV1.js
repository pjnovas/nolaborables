import chai from 'chai';
import _ from 'lodash';

import { optionalsV1 } from 'lib/filters';
const expect = chai.expect;

describe('#optionalsV1', () => {

  it('must remove optional holidays for Version 1 of the API', () => {

    let holidays = [{
      dia: 1, mes: 1,
      motivo: 'Feriado 1',
      tipo: 'inamovible'
    }, {
      dia: 1, mes: 1,
      motivo: 'Feriado 2',
      tipo: 'nolaborable',
      opcional: 'origen',
      origen: 'armenia'
    }, {
      dia: 3, mes: 2,
      motivo: 'Feriado 3',
      tipo: 'puente'
    }, {
      dia: 12, mes: 2,
      motivo: 'Feriado 4',
      tipo: 'nolaborable',
      opcional: 'religion',
      religion: 'cristianismo'
    }, {
      dia: 22, mes: 3,
      motivo: 'Feriado 5',
      tipo: 'nolaborable',
      opcional: 'religion',
      religion: 'judaísmo'
    }, {
      dia: 8, mes: 4,
      motivo: 'Feriado 6',
      tipo: 'trasladable',
      traslado: 5
    }];

    let expected = [
      holidays[0],
      holidays[2],
      holidays[5]
    ];

    let result = optionalsV1(holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
