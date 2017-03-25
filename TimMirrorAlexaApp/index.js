var MirrorSkill = require('./src/MirrorSkill');

// 2017/3/25 14:17
exports.handler = function (event, context) {
    var mirrorSkill = new MirrorSkill();
    mirrorSkill.execute(event, context);
};