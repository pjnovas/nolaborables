import Joi from 'joi';
import chain from './chain';

import { monthly as reducer } from 'lib/reducers';
import { monthly as loader } from 'lib/loaders';
import { monthlyOptionals as noOptionals } from 'lib/filters';

import holidays, { fijos, ref } from 'lib/data/holidays';

const incluir = Joi.any().only('opcional');

const setHolidays = (request, reply) => {
  let plain = reducer(fijos, holidays[`h${request.year}`]);
  request.holidays = loader(plain, ref);
  reply.next();
};

const filter = (request, reply) => {
  let incluir = request.query.incluir;
  if (!incluir || (incluir && request.query.incluir !== 'opcional')){
    request.holidays = noOptionals(request.holidays);
  }
  reply.next();
};

exports.year = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    },
    query: { incluir }
  },
  handler: chain(
    (request, reply) => {
      request.year = request.params.year;
      reply.next();
    },
    setHolidays,
    filter,
    (request, reply) => reply(request.holidays)
  )
};
