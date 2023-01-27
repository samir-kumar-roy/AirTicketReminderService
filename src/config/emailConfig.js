const nodemailer = require('nodemailer');
const { EMAIL_ID, APP_PASS } = require('./serverConfig');

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_ID,
        pass: APP_PASS
    }
});
module.exports = {
    sender
}