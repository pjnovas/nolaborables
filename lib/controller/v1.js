import Joi from 'joi';
import Boom from 'boom';
import {get} from 'lodash';
import chain from './chain';

import { holidaysV1 as reducer } from 'lib/reducers';
import { holidaysV1 as loader } from 'lib/loaders';
import { optionalsV1 as noOptionals } from 'lib/filters';

import holidays, { ref } from 'lib/data/holidays';

const query = { excluir: Joi.any().only('opcional') };

const setThisYear = (request, reply) => {
  request.year = new Date().getFullYear();
  reply.next();
};

const setHolidays = (request, reply) => {
  let yHolidays = get(holidays, `h${request.year}`);
  if (!yHolidays) return reply(Boom.notFound());

  let plain = reducer(holidays[`h${request.year}`]);
  request.holidays = loader(plain, ref);
  reply.next();
};

const excludeOptionals = (request, reply) => {
  if (request.query.excluir === 'opcional'){
    request.holidays = noOptionals(request.holidays);
  }
  reply.next();
};

exports.year = {
  validate: {
    params: {
      year: Joi.number().min(2011).required()
    },
    query
  },
  handler: chain(
    (request, reply) => {
      request.year = request.params.year;
      reply.next();
    },
    setHolidays,
    excludeOptionals,
    (request, reply) => reply(request.holidays)
  )
};

exports.current = {
  validate: { query },
  handler: chain(
    setThisYear,
    setHolidays,
    excludeOptionals,
    (request, reply) => reply(request.holidays)
  )
};

exports.next = {
  validate: { query },
  handler: chain(
    setThisYear,
    setHolidays,
    excludeOptionals,
    (request, reply) => {
      const today = {
        day: (new Date()).getDate(),
        month: (new Date()).getMonth() + 1
      };

      let holiday;
      request.holidays.some( h => {
        if (h.mes === today.month && h.dia > today.day || h.mes > today.month){
          holiday = h;
          return true;
        }
      });

      if (!holiday){
        holiday = request.holidays[0];
      }

      reply(holiday);
    }
  )
};
