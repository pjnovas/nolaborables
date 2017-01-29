import Joi from 'joi';
import chain from 'lib/controller/chain';

import {calculateDays} from 'lib/loaders';
import {festive} from 'lib/reducers';
import festiveData from 'lib/data/dias_festivos.json';
import festiveAnualData from 'lib/data/dias_festivos_anuales.json';

const setFestive = (request, reply) => {
  request.festive = festive(calculateDays(festiveData, request.year, festiveAnualData));
  reply.next();
};

exports.byYear = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    }
  },
  handler: chain(
    (request, reply) => {
      request.year = request.params.year;
      reply.next();
    },
    setFestive,
    (request, reply) => reply(request.festive)
  )
};
