require('../index');
var amqp = require('rabbitrpc')().producer;

describe('sample:test', function(){
  beforeEach(function(done){
    this.queue = 'sample:queue' + process.env.LOCAL_QUEUE;
    done();
  });

  it('should be able to publish a message, and get a ack', function(done){
    amqp.send(this.queue, {message: 'awesome!'})
    .then(done);
  });
});