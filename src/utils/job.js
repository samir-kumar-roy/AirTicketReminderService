const cron = require('node-cron');

const emailService = require('../services/email-service');
const { sender } = require('../config/emailConfig');

const setupJobs = () => {
    // running cron every 5 minutes
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach(notiObject => {
            sender.sendMail({
                from: "reminderservice@airticket.com",
                to: notiObject.recepientEmail,
                subject: notiObject.subject,
                text: notiObject.content
            },
                async (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        await emailService.updateTicket(notiObject.id, { status: "Success" });
                    }
                }
            )
        });
    })
}

module.exports = setupJobs;