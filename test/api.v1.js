
var expect = require('expect.js'),
  request = require('request');

var SERVER_URL = 'http://localhost',
  SERVER_PORT = 3100,
  SERVER_API_URL = "/API",
  API_VERSION = "/v1",
  DATA_PATH = '../data/';

describe('API v1', function(){

	function makeRequest(options, callback){
		options = options || {};

		var url = options.url || SERVER_URL + ':' + SERVER_PORT + SERVER_API_URL;
			url += options.apiVersion || API_VERSION;
			url += options.restUri || '',
			url += (options.queryString) ? '?' + options.queryString : '';

		console.log('[%s]\r', url);

		options.url = url;
		options.method = options.method || "GET";
		options.headers = options.headers || { "Content-type" : "application/json" };
		//options.json = options.json || true;

		request(options, callback);
	}

  describe('#porAño', function(){

  	function callByYear(year, callback){
  		makeRequest({ restUri: '/' + year }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(200);

	      var yearJson = require(DATA_PATH + year + '.json');
	      var fijos = require(DATA_PATH + 'fijos.json');

	      var result = JSON.parse(body);

	      expect(yearJson.length + fijos.length).to.be(result.length);

	      callback();
	    });
  	}

  	function callByYear404(year, callback){
  		makeRequest({ restUri: '/' + year }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(404);

	      callback();
	    });
  	}

  	function callByYearNoOptional(year, callback){
  		makeRequest({ restUri: '/' + year, queryString: 'excluir=opcional' }, 
  			function (error, response, body) {
		      if (error) throw new Error(error);
					
		      expect(response.statusCode).to.be(200);

		      var yearJson = require(DATA_PATH + year + '.json');
		      var fijos = require(DATA_PATH + 'fijos.json');
		      var holidays = fijos.concat(yearJson);

		      var opcCount = 0;
		      for(var i=0; i<holidays.length; i++){
		      	if (holidays[i].opcional)
		      		opcCount++;
		      }

		      var result = JSON.parse(body);
		      
					expect(holidays.length - opcCount).to.be(result.length);

		      for(var i=0; i<result.length; i++){
		      	expect(result[i].opcional).to.be(undefined);
		      }

		      callback();
	    });
    }

    it('should return every holiday for year 2011', function(done){
      callByYear(2011, done);
    });

    it('should return every holiday for year 2012', function(done){
      callByYear(2012, done);
    });

    it('should return every holiday for year 2013', function(done){
      callByYear(2013, done);
    });

    it('should return every holiday for year 2014', function(done){
      callByYear(2014, done);
    });

    it('should return a 404 (not found) error if year is not present', function(done){
      callByYear404(2010, function(){
      	callByYear404(2020, done);	
      });
    });

    it('should return a 400 (bad request) error if year is not numeric', function(done){
      
      makeRequest({ restUri: '/whatever' }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(400);

	      done();
	    });

    });

    it("should NOT return optional holidays when filter 'excluir' is opcional", function(done){
    	callByYearNoOptional(2011, function(){
      	callByYearNoOptional(2012, function(){
      		callByYearNoOptional(2013, function(){
            callByYearNoOptional(2014, function(){
      			 done();
             });
      		});
      	});	
      });
    });

  });

  describe('#actual', function(){
		var actualYear = new Date().getFullYear();

    it('should return every holiday at current year', function(done){
			
			makeRequest({ restUri: '/actual' }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(200);

	      var actualYearJson = require(DATA_PATH + actualYear + '.json');
	      var fijos = require(DATA_PATH + 'fijos.json');

	      var result = JSON.parse(body);

	      expect(actualYearJson.length + fijos.length).to.be(result.length);

	      done();
	    });

    });

    it("should NOT return optional holidays when filter 'excluir' is opcional for current year", function(done){

			makeRequest({ restUri: '/actual', queryString: 'excluir=opcional' }, 
  			function (error, response, body) {
		      if (error) throw new Error(error);
					
		      expect(response.statusCode).to.be(200);

		      var yearJson = require(DATA_PATH + actualYear + '.json');
		      var fijos = require(DATA_PATH + 'fijos.json');
		      var holidays = fijos.concat(yearJson);

		      var opcCount = 0;
		      for(var i=0; i<holidays.length; i++){
		      	if (holidays[i].opcional)
		      		opcCount++;
		      }

		      var result = JSON.parse(body);
		      
					expect(holidays.length - opcCount).to.be(result.length);

		      for(var i=0; i<result.length; i++){
		      	expect(result[i].opcional).to.be(undefined);
		      }

		      done();
	    });

    });

  });

  describe('#proximo', function(){
    var firstHoliday = {
      "dia": 1,
      "mes": 1 ,
      "motivo": "Año Nuevo",
      "tipo": "innamovible"
    };

  	var currYear = new Date().getFullYear();
  	
  	function getNextOne(optional){
  		var yearfl = require(DATA_PATH + currYear + '.json');
	    var fijosfl = require(DATA_PATH + 'fijos.json');
	    var holidays = fijosfl.concat(yearfl);

	    holidays.sort(function(a, b) { 
	      var r = parseInt(a.mes) - parseInt(b.mes);
	      if (r === 0) {
	        r = parseInt(a.dia) - parseInt(b.dia);
	      }
	      return r;
	    });

	    var currMonth = (new Date()).getMonth() + 1;
      var currDay = (new Date()).getDate(); 

      var holiday = {};
      for(var i=0; i < holidays.length; i++){
        if (currMonth == holidays[i].mes && holidays[i].dia > currDay
          || holidays[i].mes > currMonth ){

        	if(optional === 'null' && holidays[i].opcional)
        		continue;
        	else {
	          holiday = holidays[i];
	          break;
          }
        }
      }

      return holiday;
  	}

    it('should return the next holiday (Jan 1st if not found)', function(done){
      
			makeRequest({ restUri: '/proximo' }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(200);

	      var nextone = getNextOne();
        if (!nextone.dia)
          nextone = firstHoliday;

	      var result = JSON.parse(body);

	      expect(result).to.be.an('object');

	      expect(result.dia).to.be(nextone.dia);
	      expect(result.mes).to.be(nextone.mes);
	      expect(result.motivo).to.be(nextone.motivo);
	      expect(result.tipo).to.be(nextone.tipo);

	      done();
	    });

    });

    it("should return the next NOT optional holiday when filter 'excluir' is opcional", function(done){

			makeRequest({ restUri: '/proximo', queryString: 'excluir=opcional' }, function (error, response, body) {
	      if (error) throw new Error(error);
				
	      expect(response.statusCode).to.be(200);

	      var nextone = getNextOne('null');
        if (!nextone.dia)
          nextone = firstHoliday;

	      var result = JSON.parse(body);

	      expect(result).to.be.an('object');

	      expect(result.dia).to.be(nextone.dia);
	      expect(result.mes).to.be(nextone.mes);
	      expect(result.motivo).to.be(nextone.motivo);
	      expect(result.tipo).to.be(nextone.tipo);

	      done();
	    });

    });

  });

});
