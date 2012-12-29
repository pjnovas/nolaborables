
var holidays = require('../models/holiday.js'),
	GoogleAnalytics = require('ga'),
	gacs = new GoogleAnalytics('UA-33270973-1', 'nolaborables.info');

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
	if (app.useGac) gacs.trackPage(req.url);

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
	if (app.useGac) gacs.trackPage(req.url);
	
	var exclude = req.query["excluir"];
	
	if (exclude === undefined){
		res.send(req.holidays);
	} 
	else {
		req.holidays = holidays.filter(exclude, req.holidays);
		res.send(req.holidays);
	}
};



