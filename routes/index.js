
var fs = require('fs'),
	ga = new require('ga');

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

exports.getAño = function(req, res){
 	ga.trackPage(req.url);

	var año = parseInt(req.params.year, 10),
		fijos = '../data/fijos.json';

	if (isNaN(año)) 
		año = (new Date()).getFullYear();

	var file = '../data/' + año + '.json',
		path = '/data/' + año + '.json';

	function onError(err){
		res.send(err, 500);
	}

	function fileExits(){
		var añofl = require(file);
  	var fijosfl = require(fijos);

    res.send(fijosfl.concat(añofl));
	}

	fileExist(onError, path, fileExits, function(){
    res.send('No se encontró la información para el año ' + año, 404);
	});
};





