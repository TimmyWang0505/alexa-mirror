var config = {};

// AWS IoT
config.aws = {};
config.aws.iotdevice = {
    "keyPath": __dirname+'/keys/2725ef784c-private.pem.key',
    "certPath": __dirname+'/keys/2725ef784c-certificate.pem.crt',
    "caPath": __dirname+'/keys/rootCA.pem.crt',
    "host": "a1upjptxeokn30.iot.us-east-1.amazonaws.com",
    "port": 8883,
    "clientId": "myRaspberryPi-"+(new Date().getTime()),
    "region":"us-east-1",
    "debug":true
};

//TODO
config.aws.APP_ID = 'amzn1.ask.skill.e1cbc0bc-aa18-493c-9add-8e04705eae36';

module.exports = config;