var AlexaSkill = require('./AlexaSkill');
var iotDevice = require('./IoTDevice');

var config = require('../config');

var APP_ID = config.aws.APP_ID;

var MirrorSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

MirrorSkill.prototype = Object.create(AlexaSkill.prototype);
MirrorSkill.prototype.constructor = MirrorSkill;

MirrorSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log('MirrorSkill onSessionStarted requestId: ' + sessionStartedRequest.requestId
        + ', sessionId: ' + session.sessionId);
    // any initialization logic goes here
};

MirrorSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log('MirrorSkill onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);
    var speechOutput = 'Welcome to Tim mirror AI!';
    var repromptText = 'Welcome to Tim mirror AI!';
    response.ask(speechOutput, repromptText);
};

MirrorSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log('MirrorSkill onSessionEnded requestId: ' + sessionEndedRequest.requestId
        + ', sessionId: ' + session.sessionId);
    // any cleanup logic goes here
};

MirrorSkill.prototype.intentHandlers = {
    // register custom intent handlers
    'HelloIntent': function (intent, session, response) {
        var outputText = 'Hello!';
        iotDevice.setup(function(){
            iotDevice.pubMessage('hello', {'message': outputText}, function(){
                response.tell(outputText);
            });
        });
    },

    'BeautyIntent': function (intent, session, response) {
        var outputText = 'Katie Ma is the most beautiful woman in the world!';
        iotDevice.setup(function(){
            iotDevice.pubMessage('beauty', {'message': outputText}, function(){
                response.tell(outputText);
            });
        });
    },

    'AMAZON.HelpIntent': function (intent, session, response) {
        response.ask('You can ask me question!', 'You can ask me question!');
    }
};

module.exports = MirrorSkill;