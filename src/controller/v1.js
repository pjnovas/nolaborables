import Joi from 'joi';
import Boom from 'boom';
import chain from './chain';

import { holidaysV1 as reducer } from '../reducers';
import { holidaysV1 as loader } from '../loaders';

import holidays, { fijos, ref } from '../data/holidays';

/*
exports.next = {
  handler: (req, reply) => reply().code(204)
};
*/

const setHolidays = (request, reply) => {
  let plain = reducer(fijos, holidays[`h${request.year}`]);
  request.holidays = loader(plain, ref);
  reply.next();
};

const excludeOptionals = (request, reply) => {
  if (request.query.excluir === 'opcional'){
    request.holidays = request.holidays.filter( holiday => !holiday.opcional);
  }

  reply.next();
};

exports.year = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    },
    query: {
      excluir: Joi.any().only('opcional')
    }
  },
  handler: chain(
    (request, reply) => {
      request.year = request.params.year;
      reply.next();
    },
    setHolidays,
    excludeOptionals,
    (request, reply) => reply(request.holidays).code(200)
  )
};

exports.current = {
  validate: {
    query: {
      excluir: Joi.any().only('opcional')
    }
  },
  handler: chain(
    (request, reply) => {
      request.year = new Date().getFullYear();
      reply.next();
    },
    setHolidays,
    excludeOptionals,
    (request, reply) => reply(request.holidays).code(200)
  )
};
