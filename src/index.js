const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(3004, () => {
        console.log(`server is listening at port `, PORT);
    })
}

setupAndStartServer(); 
