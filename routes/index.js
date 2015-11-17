
var holidays = require('../models/holiday.js'),
	NA = require('nodealytics');

var gaReady = false;
NA.initialize('UA-33270973-1', 'nolaborables.com.ar', function(){
	gaReady = true;
	console.log("GA Ready");
});

exports.index = function(req, res){
  res.render('index', { title: 'no laborables' });
};

exports.setActual = function(req, res, next){
	req.params.year = (new Date()).getFullYear();
	next();
};

exports.year = function(req, res, next){
	var year = parseInt(req.params.year, 10);

	if (isNaN(year)) {
		res.send("Petición mal formada, no se reconoce '" + year + "'", 400);
		return;
	}

	holidays.getYear(year, function(err, data){

		if (!err){
			req.holidays = data;
			next();
		}
		else if(err === 'NOTFOUND' || err.message === 'NOTFOUND'){
			res.send('No se encontró la información para el año ' + year, 404);
		}
		else {
			res.send(err, 500);
		}
	});
};

exports.nextOne = function(req, res){
	holidays.getNext(req.holidays, function(err, data){

		if (!err){
			res.send(data);
		}
		else {
			res.send(err, 500);
		}
	});

};

exports.filterNext = function(req, res, next){
	var exclude = req.query["excluir"];

	if (exclude !== undefined) {
		req.holidays = holidays.filter(exclude, req.holidays);
	}

	next();
};

exports.filter = function(req, res){
	var exclude = req.query["excluir"];

	if (exclude === undefined){
		res.send(req.holidays);
	}
	else {
		req.holidays = holidays.filter(exclude, req.holidays);
		res.send(req.holidays);
	}
};

exports.track = function(type){
	return function(req, res, next){
		if (app.useGac) NA.trackPage('Tracker: ' + type, req.url, function(){ console.log('tracked %s', type); });
		next();
	};
};
