var awsIot = require('aws-iot-device-sdk');
var deviceConfig = require("../config").aws.iotdevice;
var iot = {};

iot.topicList = [];
iot.callbacks = [];

iot.LAST_TIMESTAMP = 0;

iot.onMessage = function(callback) {
    iot.callbacks.push(callback);
};

iot.addSubscribeTopic = function(topic) {
    iot.topicList.push(topic);
};

iot.setup = function (callback) {
    iot.device = awsIot.device(deviceConfig);

    console.log('Attemt to connect to AWS IoT.');

    iot.device.on('connect', function(){
        console.log('Connected to AWS IoT.')
        
        for (var i = 0; i < iot.topicList.length; i++) {
            var topic = iot.topicList[i];
            iot.device.subscribe(topic);
            console.log('Subscribed: ' + topic);
        }

        if (callback) {
            callback();
        }
    });

    iot.device.on('message', function(topic, payload) {
        var JSONpayload = JSON.parse(payload.toString());

        // Drop old messages
        if(!JSONpayload.timestamp || JSONpayload.timestamp <= iot.LAST_TIMESTAMP) {
            console.log('Dropping: ' + JSONpayload.displayText + ' => ' + JSONpayload.timestamp);
            return;
        } else {
            // We have a new message
            iot.LAST_TIMESTAMP = JSONpayload.timestamp;
        }

        console.log('Message: ' + topic + ' => ' + JSON.stringify(JSONpayload));
        // If successfull, let's let our application know
        for(i=0;i<iot.callbacks.length;i++) {
            iot.callbacks[i](topic,JSONpayload);
        }
    });
};

iot.pubMessage = function (topic, payload, callback) {
    payload.timestamp = (new Date()).getTime();
    var payloadStr = JSON.stringify(payload);
    iot.device.publish(topic, payloadStr, function(){
        console.log('Published: \nTopic => ' + topic
                    +'Data => ' + payloadStr);
        if (callback) {
            callback();
        } 
    });
};

module.exports = iot;