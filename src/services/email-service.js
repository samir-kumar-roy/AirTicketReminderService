const { sender } = require('../config/emailConfig');

const sendBasicEmail = async (fromMail, toMail, subject, mailBody) => {
    await sender.sendMail({
        from: fromMail,
        to: toMail,
        subject: subject,
        text: mailBody
    })
}

module.exports = {
    sendBasicEmail
}