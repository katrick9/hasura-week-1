var express = require('express');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World-Krishna');
});
app.get('/authors',function(req, res){


  var request1 ={},i,s='',count=0;
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    request1=JSON.parse(body);

  var request2 = {},j;
  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    request2=JSON.parse(body);
  for(i=0;i<request1.length;i++){
    s+=request1[i].name;
    for(j=0;j<request2.length;j++){
      if(request1[i].id==request2[j].userId){
          count=count+1;
      }
    }
      s+=('-'+count+'<br>');
  }
  res.send(s);
});
});
});


app.get('/setcookie',function(req, res){
res.cookie('Name','Krishna');
res.cookie('Age','21');
res.send('cookie created successfully');
});
app.get('/getcookie',function(req, res){
  var p=req.cookies.Name+"<br>"+req.cookies.Age;

  res.send(p);

});
app.get('/robots.txt',function(req, res){
  res.status(403).send({
        message: 'Access Denyed!!!'
     });

});
app.get('/image',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.post('/int', function(req, res) {
  var value=req.body.myTextArea;
  console.log(value);
  res.send('input accepted successfully');
});
app.get('/input',function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'input.html'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(8080, function () {
  console.log(`IMAD course app listening on port!`);
});
