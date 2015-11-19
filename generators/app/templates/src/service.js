/** Service module. Loads every listener and binds them to a queue.
 * @module service
 */

var mongodb = require('./modules/mongodb'),
  amqp = require('rabbitrpc')(),
  winston = require('winston');

module.exports = mongodb
.connect()
.then(amqp.consumer.connect)
.then(function(){
  //add your queues here, example:
  //amqp.consumer.createQueue('analytics:events:connect', require('./events/connect'));
})
.catch(winston.error);

/**
 * Called when the program received a SIGINT/SIGTERM, gracefully shuts down things
 * @return {Promise} a promise resolving when everything is cleaned up smoothly
 */
var gracefulShutdown = function () {
  return mongodb.close().then(process.exit);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
