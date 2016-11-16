var MirrorSkill = require('./src/MirrorSkill');

exports.handler = function (event, context) {
    var mirrorSkill = new MirrorSkill();
    mirrorSkill.execute(event, context);
};