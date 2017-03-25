var AlexaSkill = require('./AlexaSkill');
var iotDevice = require('./IoTDevice');
var items = require('./items');
var config = require('../config');

var APP_ID = config.aws.APP_ID;

var IMG_MAP = {
    'any tool that i can use for my career planning': '/images/002.jpg',
    'participate career station activity': '/images/001.png'
};

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

    'ShowCartoonIntent': function (intent, session, response) {
        var outputText = 'OK! Do you like it?';
        iotDevice.setup(function(){
            iotDevice.pubMessage('cartoon', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },


    'QuestionIntent': function (intent, session, response) {
        var result = getResTextFromItemMap(intent);
        var outputText = result.outputText;
        var key = result.key;
        iotDevice.setup(function(){
            if (key == 'any tool that i can use for my career planning' 
            || key == 'participate career station activity') {
                var imgUrl = IMG_MAP[key];
                iotDevice.pubMessage('card', {'type': 'card', 'message': outputText, 'key': key, 'imgUrl': imgUrl}, function(){
                    response.askWithImgCard(outputText, "Sorry! What's your question?", key, outputText, imgUrl);
                });
            } else {
                iotDevice.pubMessage('message', {'type': 'message', 'message': outputText, 'key': key}, function(){
                response.ask(outputText);
            });
            }
            
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
    var key;
    if (items[itemName]) {
        outputText = items[itemName];
        key = itemName;
    } else {
        outputText = "Sorry! What's your question?";
        key = 'unknow'
    }
    return {'outputText': outputText, 'key': key};
}

module.exports = MirrorSkill;