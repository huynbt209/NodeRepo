const model = require('../models/index');
const UserRepository = require('../repositories/userRepository')
const RequestRepository = require('../repositories/requestRepository')
const axios = require('axios');
const { Op } = require("sequelize");


class UserService {
    constructor (){
        this.userRepository = new UserRepository(model.User)
        this.requestRepository = new RequestRepository(model.Request)
    }

    async CreateNewRequest(request, req) {
        request.user_id = req.session.userId;
        request.status = process.env.CHECKING;
        return await this.requestRepository.create(request);
    } 

    async GetUserIdSession(req, res, next){
        return await this.userRepository.getById(req.session.userId);   
    }

    async sendAdminMessage(message) {
        return await axios.post(process.env.SLACK_ADMIN, {"text": message});
    }

    async getAllRequest(requests, req) {
        return await this.requestRepository.getAll({
            where: { user_id: req.session.userId },
            order: [
                ['request_id', 'ASC']
            ]
        })
    }

    async getRequestByYear(requests, req) {
        return await this.requestRepository.getAll({
            where: {
                time_off: {
                    [Op.like]: `%${requests.time_off}%`
                },
                user_id: req.session.userId
            },
            order: [
                ['request_id', 'ASC']
            ]
        })
    }
}

module.exports = UserService; 