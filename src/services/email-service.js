const { sender } = require('../config/emailConfig');
const ticketReposiotry = require('../repository/ticket-repository');
const ticketRepo = new ticketReposiotry();

const sendBasicEmail = async (fromMail, toMail, subject, mailBody) => {
    await sender.sendMail({
        from: fromMail,
        to: toMail,
        subject: subject,
        text: mailBody
    })
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await ticketRepo.get({ status: "Pending" });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const createTicket = async (data) => {
    try {
        const response = await ticketRepo.createTicket(data);
        return response;
    } catch (err) {
        console.log(err);
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await ticketRepo.updateTicket(ticketId, data);
        return response;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createTicket,
    updateTicket
}