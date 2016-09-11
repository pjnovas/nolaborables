import chai from 'chai';
import _ from 'lodash';
import { calculateDays } from 'lib/loaders';
const expect = chai.expect;

describe('#calculateDays', () => {

  it('must calculate days and fill dynamic dates', () => {
    const year = 2016;
    const from = [{},{},{},{
      // 'abril',
      'calculated': {
        'first_sunday': 'Día de la locura (primer domingo de abril)',
        'second_saturday': 'Día de la vida (segundo sabado de abril)',
        'third_thursday': 'Día de la magía misma (tercer jueves de abril)'
      },
      '3': 'Día epico magico',
      '7': 'Día mundial de la fantasia',
      '14': [
        'Día A',
        'Día B'
      ]
    }];

    const expected = [{},{},{},{
      '3': [
        'Día epico magico',
        'Día de la locura (primer domingo de abril)'
      ],
      '7': 'Día mundial de la fantasia',
      '9': 'Día de la vida (segundo sabado de abril)',
      '14': [
        'Día A',
        'Día B',
        'Día de la magía misma (tercer jueves de abril)'
      ]
    }];

    let result = calculateDays(from, year);
    expect(result.length).to.be.equal(expected.length);
    expect(_.isEqual(result, expected)).to.be.true;
  });
});
