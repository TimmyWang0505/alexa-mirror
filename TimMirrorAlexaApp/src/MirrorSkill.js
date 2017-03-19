var AlexaSkill = require('./AlexaSkill');
var iotDevice = require('./IoTDevice');
var items = require('./items');
var config = require('../config');

var APP_ID = config.aws.APP_ID;

var MirrorSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

MirrorSkill.prototype = Object.create(AlexaSkill.prototype);
MirrorSkill.prototype.constructor = MirrorSkill;

MirrorSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log('MirrorSkill onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);
    iotDevice.setup(function(){
        iotDevice.pubMessage('launch', {'message': 'launch'}, function(){
            var speechOutput = 'Hello, master, what can I do for you?';
            var repromptText = 'Hello, master, what can I do for you?';
            response.ask(speechOutput, repromptText);
        });
    });
};

MirrorSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log('MirrorSkill onSessionStarted requestId: ' + sessionStartedRequest.requestId
        + ', sessionId: ' + session.sessionId);
    // any initialization logic goes here
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
                response.ask(outputText);
            });
        });
    },

    'WhosIntent': function function (intent, session, response) {
        var outputText = 'Are you kiding me? Definitely Echo! The smartest person!';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'type': 'message', 'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'WhatsIntent': function (intent, session, response) {
        var outputText = getResTextFromItemMap();
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'type': 'message', 'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'AMAZON.HelpIntent': function (intent, session, response) {
        response.ask('You can ask me question!', 'You can ask me question!');
    }
};

function getResTextFromItemMap(intent) {
    var itemSlot = intent.slots.Item;
    var itemName;
    if (itemSlot && itemSlot.value){
        itemName = itemSlot.value.toLowerCase();
    }
    var outputText;
    if (items[itemName]) {
        outputText = items[itemName];
    } else {
        outputText = "Sorry! What's your question?";
    }
    return outputText;
}

module.exports = MirrorSkill;