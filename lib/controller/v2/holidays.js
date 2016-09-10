import Joi from 'joi';
import chain from 'lib/controller/chain';

import {
  monthly as reduceMonthly,
  list as reduceList
} from 'lib/reducers';

import {
  monthly as loadMonthly,
  list as loadList
} from 'lib/loaders';

import {
  monthlyOptionals as noOptionalsMonthly,
  listOptionals as noOptionalsList
} from 'lib/filters';

import holidays, { fijos, ref } from 'lib/data/holidays';

const setHolidays = (request, reply) => {

  if (request.format === 'mensual'){
    let plain = reduceMonthly(fijos, holidays[`h${request.year}`]);
    request.holidays = loadMonthly(plain, ref);
  }
  else {
    let plain = reduceList(fijos, holidays[`h${request.year}`]);
    request.holidays = loadList(plain, ref);
  }

  reply.next();
};

const filter = (request, reply) => {
  let incluir = request.query.incluir;
  if (!incluir || (incluir && request.query.incluir !== 'opcional')){
    if (request.format === 'mensual'){
      request.holidays = noOptionalsMonthly(request.holidays);
    }
    else {
      request.holidays = noOptionalsList(request.holidays);
    }
  }
  reply.next();
};

exports.byYear = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    },
    query: {
      formato: Joi.any().only('mensual'),
      incluir: Joi.any().only('opcional')
    }
  },
  handler: chain(
    (request, reply) => {
      request.year = request.params.year;
      request.format = request.query.formato || 'list';
      reply.next();
    },
    setHolidays,
    filter,
    (request, reply) => reply(request.holidays)
  )
};

exports.references = {
  handler: (request, reply) => {
    reply(ref);
  }
};
