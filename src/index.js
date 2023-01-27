const express = require('express');
const bodyParser = require('body-parser');

const { PORT, EMAIL_ID, APP_PASS } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`server is listening at port `, PORT);
        sendBasicEmail(EMAIL_ID, "samirroy.8990@gmail.com", 'Testing mail service', 'Hey Dude! How are you?')
    })
}

setupAndStartServer(); 
