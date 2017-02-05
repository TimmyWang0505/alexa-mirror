var MirrorSkill = require('./src/MirrorSkill');

// 2017/2/5 23:27
exports.handler = function (event, context) {
    var mirrorSkill = new MirrorSkill();
    mirrorSkill.execute(event, context);
};