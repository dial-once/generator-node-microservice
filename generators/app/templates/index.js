/** service module. Starts listeners on the AMQP Broker to receive and answer to Analytics messages.
 * @module service-
 */
require('dotenv').load();
require('./src/boot/winston');

var http = require('http');

/**
 * Create a server that will listen on default port (process.env.PORT or 3000) and return service status
 * @param  {object} req - Express req object type, used to receive various params
 * @param  {object} res - Express res object type, used to send back the response
 * @return {void} nothing
 */
require('./src/service').then(function(){
  http.createServer(function (req, res) {  
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
  }).listen(process.env.PORT || 3000);
});