import chai from 'chai';
import _ from 'lodash';

import { listOptionals } from 'lib/filters';
const expect = chai.expect;

describe('#listOptionals', () => {

  it('must remove optional holidays for Version 2 of the API as LIST', () => {

    let holidays = [{
      id: 'code1',
      dia: 1, mes: 1,
      motivo: 'Feriado 1',
      tipo: 'inamovible'
    }, {
      id: 'code2',
      dia: 1, mes: 1,
      motivo: 'Feriado 2',
      tipo: 'nolaborable',
      opcional: 'origen',
      origen: 'armenia'
    }, {
      id: 'code3',
      dia: 3, mes: 2,
      motivo: 'Feriado 3',
      tipo: 'puente'
    }, {
      id: 'code4',
      dia: 12, mes: 2,
      motivo: 'Feriado 4',
      tipo: 'nolaborable',
      opcional: 'religion',
      religion: 'cristianismo'
    }, {
      id: 'code5',
      dia: 22, mes: 3,
      motivo: 'Feriado 5',
      tipo: 'nolaborable',
      opcional: 'religion',
      religion: 'judaísmo'
    }, {
      id: 'code6',
      dia: 8, mes: 4,
      motivo: 'Feriado 6',
      tipo: 'trasladable',
      original: 5
    }];

    let expected = [
      holidays[0],
      holidays[2],
      holidays[5]
    ];

    let result = listOptionals(holidays);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(expected.length);

    expect(_.isEqual(result, expected)).to.be.true;
  });
});
