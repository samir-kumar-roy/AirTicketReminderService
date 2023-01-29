const ticketService = require('../services/email-service');
const create = async (req, res) => {
    try {
        const response = await ticketService.createTicket(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            error: {},
            message: "Successfully registered an email reminder"
        });
    } catch (err) {
        console.log(err);
        return res.status().json({
            success: false,
            data: {},
            error: err,
            message: "Unable to register an email reminder"
        });

    }
}

module.exports = {
    create
}