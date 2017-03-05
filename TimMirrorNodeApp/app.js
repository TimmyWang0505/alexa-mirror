var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var iotDevice = require('./src/IoTDevice');
var io = require('socket.io')(4000);

var index = require('./routes/index');

var app = express();

iotDevice.addSubscribeTopic('launch');
iotDevice.addSubscribeTopic('message');
iotDevice.addSubscribeTopic('showNameCard');
iotDevice.addSubscribeTopic('showPic');


iotDevice.addSubscribeTopic('hello');
iotDevice.addSubscribeTopic('beauty');
iotDevice.addSubscribeTopic('smart');
// iotDevice.addSubscribeTopic('playMp3');
// iotDevice.addSubscribeTopic('stopMp3');

iotDevice.setup(function(){});

iotDevice.onMessage(function(topic, payload) {
    if (topic == 'launch') {
      var state = {topic:topic,state:payload.message};
      io.emit('launch',state);
    } else if (topic == 'showNameCard') {
      var state = {topic:topic,state:''};
      io.emit('showNameCard',state);
    } else if (topic == 'showPic') {
      var state = {topic:topic,state:payload.name};
      io.emit('showPic',state);
    } else {
      var state = {topic:topic,state:payload.message};
      io.emit('showMsg',state);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.set('port', 9090);
app.listen(app.get('port'));

module.exports = app;
