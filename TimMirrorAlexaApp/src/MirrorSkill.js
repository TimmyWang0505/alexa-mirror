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
            var speechOutput = 'Hello, I am mirror AI, what can I do for you?';
            var repromptText = 'Hello, I am mirror AI, what can I do for you?';
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
    //Done
    'WhatKindsOfDtSupportIntent': function (intent, session, response) {
        var outputText = 'To be a digital talent, both the skills and mindsets are required. ' 
        + 'There are two types of skills are defined. The foundational skills and specialty skills. ' 
        + 'For the foundational skills, all employees should have an awareness of each of these skills.' 
        + 'The skills in yellow are PI Dalian’s focus in 2017, and we provided the learning path for these skills. '
        + 'The skills in green are what we have built.  The specialty skills will become relevant within the next 18-24 months.' 
        + 'For the mindset change, we would like to build the leadership capabilities from three areas. Customer obsessed, people powering and future fast.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': 'PI Digital Talent Profile', 'imgURL': 'dtp.png'}, function(){
                response.ask(outputText);
            });
        });
    },

    'HowToLearnDtIntent': function (intent, session, response) {
        //TODO: update the alexa response text...
        var outputText = 'This is the learning model which can help you build your digital skills.' 
            + 'There are four Badge Levels, Apprentice, Practitioner, Leader and Master. '
            + 'You can acquire abundant technology learning resources from PI Badge-Level Appropriate Training' 
            + 'or PI Dalian Badge-Level Appropriate Training. ' 
            + 'After completing the corresponding training and obtaining the qualified skills, ' 
            + 'you can obtain Apprentice badge level. ' 
            + 'After that you can apply skills and deliver business value in your daily work, ' 
            + 'so that you can get Practitioner badge level. ' 
            + 'And after that you can take complementary PI Specific Training to get the Leader Level and Master Level badge. ' 
            + 'You can learn more from the learning path for a digital skill.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': 'This is the learning model which can help you build your digital skills.', 'imgURL': 'howto.png'}, function(){
                response.ask(outputText);
            });
        });
    },


    'showDigitalTrendsIntent': function (intent, session, response) {
        //TODO: update the script
        var outputText = 'Along with the time line, we can step back to see the evolution of technology. ' 
            + 'You can find in the recent ten years, the technology was developed so rapidly. ' 
            + 'You may be aware of that Amazon EC2, OpenStack, Docker and AlphaGo which are popped up in recent ten years and continuously come to our ears in our daily life. ' 
            + 'And some of them are already used in our delivery work. Based on predict by MITSloan, ' 
            + 'in the year of 2025, some emerging technologies will achieve prosperity, ' 
            + 'like Big Data, AI, Blockchain and Cyber Security, etc.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': 'Technology Trend', 'imgURL': 'trends.png'}, function(){
                response.ask(outputText);
            });
        });
    },
    //Done
    'PassYellowBadgeIntent': function (intent, session, response) {
        var outputText = 'Currently we are mainly focusing on the cyber security and cloud. Here is the yellow badge coverage for them.'
        + 'There are 78.45% associates get the yellow badge on cyber security, and 60.7% associates get yellow badge on cloud.';
        var displayText = 'Currently we are mainly focusing on the cyber security and cloud. Here is the yellow back coverage for them.' 
            + '<br><br>Cyber security: 222 (78.45%)' 
            + '<br>Cloud: 170 (60.7%)'
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'type': 'message', 'message': displayText}, function(){
                response.ask(outputText);
            });
        });
    },

    //Done
    'ShowMeLearningPathIntent': function (intent, session, response) {
        //TODO: update the alexa response text
        var outputText = getResTextFromItemMap(intent);

        var itemSlot = intent.slots.Item;
        var itemName = '';
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var IMGS_MAP = {
            'cyber security': 'security.png',
            'cloud': 'cloud.png',
            'android': 'android.png',
            'ios': 'ios.png',
            '': 'default.png'
        };
        var imgURL = IMGS_MAP[itemName]
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': 'Learning Path', 'imgURL': imgURL}, function(){
                response.ask(outputText);
            });
        });
    },

    //Done
    'HowmanyPassedIntent': function (intent, session, response) {
        var RESULT_MAP = {
            'cyber security-yellow': 98,
            'cyber security-green': 100,
            'cyber security-purple': 100,

            'cloud-yellow': 100,
            'cloud-green': 100,
            'cloud-purple': 100,

            'android-yellow': 100,
            'android-green': 100,
            'android-purple': 100,

            'ios-yellow': 100,
            'ios-green': 100,
            'ios-purple': 100
        };

        var itemSlot = intent.slots.Item;
        var itemName = '';
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var colorSlot = intent.slots.Color;
        var colorName = '';
        if (colorSlot && colorSlot.value){
            colorName = colorSlot.value.toLowerCase();
        }

        var key = itemName + '-' + colorName;
        var outputText = "Sorry! What's your question?";
        if (RESULT_MAP[key] != undefined) {
            outputText = RESULT_MAP[key] + ' associates passed it';
        } 
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