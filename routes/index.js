
var holidays = require('../models/holiday.js'),
	GoogleAnalytics = require('ga'),
	gacs = new GoogleAnalytics('UA-33270973-1', 'nolaborables.info');

exports.index = function(req, res){
  res.render('index', { title: 'no laborables' });
};

exports.year = function(req, res){
 	gacs.trackPage(req.url);

	var year = parseInt(req.params.year, 10);

	if (isNaN(year)) 
		year = (new Date()).getFullYear();

	holidays.getYear(year, function(err, data){

		if (!err){
			res.send(data);
		}
		else if(err === 'NOTFOUND' || err.message === 'NOTFOUND'){
			res.send('No se encontró la información para el año ' + year, 404);
		}
		else {
			res.send(err, 500);
		}
	});
};

exports.next = function(req, res){
	gacs.trackPage(req.url);

	holidays.getNext(function(err, data){

		if (!err){
			res.send(data);
		}
		else {
			res.send(err, 500);
		}
	});

};





