import Joi from 'joi';
import Boom from 'boom';

import { holidaysV1 as reducer } from '../reducers';
import { holidaysV1 as loader } from '../loaders';

import holidays, { fijos, ref } from '../data/holidays';

/*
exports.next = {
  handler: (req, reply) => reply().code(204)
};

exports.current = {
  handler: (req, reply) => reply().code(204)
};
*/

exports.year = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    }
  },
  handler: ({ params }, reply) => {
    let plain = reducer(fijos, holidays[`h${params.year}`]);
    reply(loader(plain, ref)).code(200);
  }
};
