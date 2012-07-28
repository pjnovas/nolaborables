
var fs = require('fs');

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

  function onExists(){
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

  fileExist(done, path, onExists, function(){
    done(new Error('NOTFOUND'));
  });

}

function getNextOne(done){
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

      done(null, holiday);
    }
    else {
      done(err);
    }
  });

}


module.exports ={
  getYear: getYearData,
  getNext: getNextOne
};

