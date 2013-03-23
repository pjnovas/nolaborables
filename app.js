
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("jsonp callback", true);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(allowCORS);
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.useGac = false;
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.useGac = true;
});

function allowCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

// Routes

app.get('/', routes.index);
app.get('/api/v1/proximo', routes.setActual, routes.year, routes.filterNext, routes.nextOne);
app.get('/api/v1/actual', routes.setActual, routes.year, routes.filter);
app.get('/api/v1/:year', routes.year, routes.filter);

var port = process.env.PORT || 3100;
app.listen(port, function(){
  console.log("NoLaborables server listening on port %d in %s mode", port, app.settings.env);
});
