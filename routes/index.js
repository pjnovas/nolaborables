
var fs = require('fs'),
	GoogleAnalytics = require('ga'),
	gacs = new GoogleAnalytics('UA-33270973-1', 'nolaborables.info');

exports.index = function(req, res){
  res.render('index', { title: 'no laborables' });
};

function fileExist(error, fileName, exist, doesnot){
	
	function validateStatus(err, stat) {
    if(err == null) exist();     
    else if(err.code == 'ENOENT') doesnot();
    else error(err);
	}
	
	function getFileStatus(err, localPath){
		if (err) error(err);
		else fs.stat(localPath + fileName, validateStatus);
	}
	
	fs.realpath('./', getFileStatus);
};

function getYearData(year, done) {

	var file = '../data/' + year + '.json',
		path = '/data/' + year + '.json',
		fijos = '../data/fijos.json';

	function fileExits(){
		var añofl = require(file);
  	var fijosfl = require(fijos);
  	var holidays = fijosfl.concat(añofl);

  	holidays.sort(function(a, b) { 
			var r = parseInt(a.mes) - parseInt(b.mes);
			if (r === 0) {
				r = parseInt(a.dia) - parseInt(b.dia);
			}
			return r;
		});

    done(null, holidays);
	}

	fileExist(done, path, fileExits, function(){
    done(new Error('NOTFOUND'));
	});

}

exports.getYear = function(req, res){
 	gacs.trackPage(req.url);

	var year = parseInt(req.params.year, 10);

	if (isNaN(year)) 
		year = (new Date()).getFullYear();

	getYearData(year, function(err, data){
		if (!err){
			res.send(data);
		}
		else if(err === 'NOTFOUND'){
			res.send('No se encontró la información para el año ' + year, 404);
		}
		else {
			res.send(err, 500);
		}
	});
};

exports.getNext = function(req, res){
	gacs.trackPage(req.url);

	var actual = (new Date()).getFullYear();	

	getYearData(actual, function(err, data){
		if (!err){
			
			var currMonth = (new Date()).getMonth() + 1;
			var currDay = (new Date()).getDate(); 

			var holiday = {};
			for(var i=0; i < data.length; i++){
				if (currMonth == data[i].mes && data[i].dia > currDay
					|| data[i].mes > currMonth ){

					holiday = data[i];
					break;
				}
			}

			res.send(holiday);
		}
		else if(err === 'NOTFOUND'){
			res.send('No se encontró la información para el año ' + actual, 404);
		}
		else {
			res.send(err, 500);
		}
	});
};





