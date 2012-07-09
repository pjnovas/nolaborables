
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'no laborables' });
};

exports.getAño = function(req, res){
	var año = parseInt(req.params.year, 10),
		fijos = '../data/fijos.json';
		
	if (isNaN(año)) 
		año = (new Date()).getFullYear();

	var file = '../data/' + año + '.json',
		path = './data/' + año + '.json';

	fs.exists(path, function(exists) {
	  if (exists) {
	  	var añofl = require(file);
	  	var fijosfl = require(fijos);

	    res.send(fijosfl.concat(añofl));
	  } else {
	    res.send('No se encontró la información para el año ' + año, 404);
	  }
	});
};


