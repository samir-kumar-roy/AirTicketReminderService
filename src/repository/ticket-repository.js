const { Op } = require('sequelize');
const { NotificationTicket } = require('../models/index');

class ticketRepository {
    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async createTicket(data) {
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;

        } catch (err) {
            throw err;
        }
    }

    async get(filter) {
        try {
            const response = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            });
            return response;
        } catch (err) {
            throw err;
        }
    }

    async updateTicket(ticketId, data) {
        try {
            const response = await NotificationTicket.findByPk(ticketId);
            if (data.status) {
                response.status = data.status;
                await response.save();
            }
            return response;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ticketRepository;