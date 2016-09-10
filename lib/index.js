
import { Server } from 'hapi';

const server = new Server();

let {
  NODE_ENV,
  PORT,
  HOST
} = process.env;

server.connection({
  port: PORT || 1337,
  host: HOST || '0.0.0.0',
  routes: { cors: true }
});

server.register([
  require('blipp')
], () => {
  server.route(require('lib/routes'));

  server.start(() => {
    console.log(`ENV [${NODE_ENV}]`);
    console.log('API up and running at:', server.info.uri);
  });

});

export default server;
