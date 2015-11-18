/** Service module. Loads every listener and binds them to a queue.
 * @module service
 */

var mongodb = require('./modules/mongodb'),
  amqp = require('rabbitrpc')(),
  winston = require('winston');

mongodb
.connect()
.then(amqp.consumer.connect)
.then(function(){
  //add your queues here, example:
  //amqp.consumer.createQueue('analytics:events:connect', require('./events/connect'));
})
.catch(function(err){
  winston.error(err);
  throw err;
});

/**
 * Called when the program received a SIGINT/SIGTERM, gracefully shuts down things
 * @return {Promise} a promise resolving when everything is cleaned up smoothly
 */
var gracefulShutdown = function () {
  return mongodb.close().then(process.exit);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
