var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var senderModule = require("../RBClient/client_send");


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:user', function (req, res) {
    res.send("Hello " + req.params["user"])
})
app.post('/:user', function (req, res) {
    console.log(req.body);

    let sender = senderModule.createSender("ex_hello")
  
    setTimeout(function(){
        sender.send(req.body.message);
    }, 1000);    
})

app.listen(3000)