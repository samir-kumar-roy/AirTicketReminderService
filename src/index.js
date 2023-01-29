const express = require('express');
const bodyParser = require('body-parser');

const jobs = require('./utils/job');

const { PORT, EMAIL_ID } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');
const ticketController = require('./controllers/ticket-controller');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/api/v1/tickets', ticketController.create);
    app.listen(PORT, () => {
        console.log(`server is listening at port `, PORT);
        jobs();
        // sendBasicEmail(EMAIL_ID, "samirroy.8990@gmail.com", 'Testing mail service', 'Hey Dude! How are you?')

    })
}

setupAndStartServer(); 
