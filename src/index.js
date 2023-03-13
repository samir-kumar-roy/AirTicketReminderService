const express = require('express');
const bodyParser = require('body-parser');

const jobs = require('./utils/job');

const { PORT, EMAIL_ID } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');
const ticketController = require('./controllers/ticket-controller');
// const { createChannel } = require('./utils/message-queue');
const { subscribeMessage, createChannel } = require('./utils/message-queue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');
const emailService = require('./services/email-service');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const channel = await createChannel();
    subscribeMessage(channel, emailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets', ticketController.create);
    app.listen(PORT, () => {
        console.log(`server is listening at port `, PORT);
        jobs();
        // sendBasicEmail(EMAIL_ID, "samirroy.8990@gmail.com", 'Testing mail service', 'Hey Dude! How are you?')

    })
}

setupAndStartServer(); 
