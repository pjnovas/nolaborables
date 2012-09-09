
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/api/v1/proximo', routes.setActual, routes.year, routes.filterNext, routes.nextOne);
app.get('/api/v1/actual', routes.setActual, routes.year, routes.filter);
app.get('/api/v1/:year', routes.year, routes.filter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("NoLaborables server listening on port %d in %s mode", port, app.settings.env);
});

process.on("uncaughtException", function (err) { 
  console.log('>>>>>> Unhandled Exception Ocurred: ' + err);
});