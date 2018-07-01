var amqp = require('amqplib/callback_api');

function Sender(exchName){
    const that = this;
    that.exchangeName = exchName;

    amqp.connect('amqp://localhost', function (err, conn) {
        that.connection = conn;

        that.connection.createChannel(function (err, ch) {
            that.chanel = ch;            
            that.chanel.assertExchange(that.exchangeName, 'fanout', {durable: false});
        });    
    }); 

    that.send = function(msg){                
        that.chanel.publish(that.exchangeName, '' ,new Buffer(msg));
        setTimeout(function(){that.connection.close();},1000);
    }
}

module.exports.createSender = function(exchName){
   return new Sender(exchName);
}