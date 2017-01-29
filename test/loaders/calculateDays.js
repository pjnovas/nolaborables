import chai from 'chai';
import _ from 'lodash';
import { calculateDays } from 'lib/loaders';
const expect = chai.expect;

describe('#calculateDays', () => {
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

  it('must calculate days and fill dynamic dates [2016]', () => {
    const expected = [{},{},{},{
      '3': [
        'Día epico magico',
        'Día de la locura (primer domingo de abril)'
      ],
      '7': 'Día mundial de la fantasia',
      '9': 'Día de la vida (segundo sabado de abril)',
      '14': [
        'Día A',
        'Día B'
      ],
      '21': 'Día de la magía misma (tercer jueves de abril)'
    }];

    const result = calculateDays(from, 2016);
    expect(result.length).to.be.equal(expected.length);
    expect(_.isEqual(result, expected)).to.be.true;
  })

  it('must calculate days and fill dynamic dates [2017]', () => {
    const expected = [{},{},{},{
      '2': 'Día de la locura (primer domingo de abril)',
      '3': 'Día epico magico',
      '7': 'Día mundial de la fantasia',
      '8': 'Día de la vida (segundo sabado de abril)',
      '14': [
        'Día A',
        'Día B'
      ],
      '20': 'Día de la magía misma (tercer jueves de abril)'
    }];

    const result = calculateDays(from, 2017);
    expect(result.length).to.be.equal(expected.length);
    expect(_.isEqual(result, expected)).to.be.true
  });

  it('must calculate days and fill dynamic dates for anual day numbers', () => {
    const programmersDay = {'256': 'Día del Programador'}
    const allMonth = _.times(8, _.constant({}))
    const from = allMonth.concat([{ // 'september',
      '12': 'Día epico magico'
    }]);

    const expectedLeap = allMonth.concat([{
      '12': [
        'Día epico magico',
        'Día del Programador'
      ]
    }]);

    const expectedNormal = allMonth.concat([{
      '12': 'Día epico magico',
      '13': 'Día del Programador'
    }]);

    let result = calculateDays(from, 2016, programmersDay);
    expect(_.isEqual(result, expectedLeap)).to.be.true

    result = calculateDays(from, 2017, programmersDay);
    expect(_.isEqual(result, expectedNormal)).to.be.true
  });

});
