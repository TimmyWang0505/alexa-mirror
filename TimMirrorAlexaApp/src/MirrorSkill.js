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

    'VideoQuestionAIntent': function (intent, session, response) {
        var outputText = 'I am the innovation';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    // 'VideoQuestionBIntent': function (intent, session, response) {
    //     var outputText = 'Fidelity’s innovative culture and your creative mind give life to me.';
    //     iotDevice.setup(function(){
    //         iotDevice.pubMessage('message', {'message': outputText}, function(){
    //             response.ask(outputText);
    //         });
    //     });
    // },

    // 'VideoQuestionCIntent': function (intent, session, response) {
    //     var outputText = 'Fidelity’s innovative culture and your creative mind give life to me. And I will live forever because Fidelity’s innovative forever.';
    //     iotDevice.setup(function(){
    //         iotDevice.pubMessage('message', {'message': outputText}, function(){
    //             response.ask(outputText);
    //         });
    //     });
    // },

    'ShowCartoonIntent': function (intent, session, response) {
        var outputText = 'OK! Do you like it? :)';
        iotDevice.setup(function(){
            iotDevice.pubMessage('cartoon', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'QuestionAIntent': function (intent, session, response) {
        var outputText = 'The one who has passion to have career advancement';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },
    'QuestionBIntent': function (intent, session, response) {
        var outputText = 'We have four activities. SLT dialog. A Normal Day Round Table. Career Planning Station. Invest in Yourself workshop';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },
    'QuestionCIntent': function (intent, session, response) {
        var outputText = 'Build Your Brand Feedback is a gift by Danny. Future Talent and Digital Talent by Andy. Building habits for Career Advancement by Allan. Do what needs to be done by Daniel.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },
    'QuestionDIntent': function (intent, session, response) {
        var outputText = 'System Analyst, Sun Yezi. Architect, Yang Younky. scrum master, Liu Jenny. Manager, Run Robert.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'QuestionEIntent': function (intent, session, response) {
        var outputText = 'Please see the trip guide.';
        var imgUrl = '/images/001.png';
        var key = 'participate career station activity';
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': outputText, 'key': key, 'imgUrl': imgUrl}, function(){
                response.ask(outputText);
                //  response.askWithImgCard(outputText, "Sorry! What's your question?", key, outputText, imgUrl);
            });
        });
    },

    'QuestionFIntent': function (intent, session, response) {
        var outputText = 'There are four booth exhibition, they are my career, I can program, staffing and learning and resources.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'QuestionGIntent': function (intent, session, response) {
        var outputText = 'Visit the 4 booths in Boston room and participate the activities in each booth';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'QuestionHIntent': function (intent, session, response) {
        var outputText = 'Yes! You can use my career to plan your career. Please go to my career Booth for more information.';
        var imgUrl = '/images/002.jpg';
        var key = 'any tool that i can use for my career planning';
        iotDevice.setup(function(){
            iotDevice.pubMessage('card', {'type': 'card', 'message': outputText, 'key': key, 'imgUrl': imgUrl}, function(){
                 response.ask(outputText);
                //  response.askWithImgCard(outputText, "Sorry! What's your question?", key, outputText, imgUrl);
            });
        });
    },

    'QuestionIIntent': function (intent, session, response) {
        var outputText = 'In third round I CAN Session, you can go to I CAN booth in Boston to register on the spot.';
        iotDevice.setup(function(){
            iotDevice.pubMessage('message', {'message': outputText}, function(){
                response.ask(outputText);
            });
        });
    },

    'AMAZON.HelpIntent': function (intent, session, response) {
        response.ask('You can ask me question!', 'You can ask me question!');
    }
};

module.exports = MirrorSkill;