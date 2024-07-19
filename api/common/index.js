const user = require('../models/users');
const inviteCode = require('../models/inviteCode');
const getUserInviteByCode = async (code) => {
    return await inviteCode.findOne({code})
}

module.exports = {
    getUserInviteByCode
}