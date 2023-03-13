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


const createNotification = async (data) => {
    try {
        console.log(data);
        const response = await ticketRepo.createTicket(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const subscribeEvents = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;

        case 'SEND_BASIC_EMAIL':
            await sendBasicEmail(data);
            break;

        default:
            console.log('No valid payload');
            break;
    }
}

module.exports = {
    subscribeEvents,
    sendBasicEmail,
    fetchPendingEmails,
    createTicket,
    updateTicket,
    createNotification
}