const RequestRepository = require('../repositories/requestRepository');
const UserRepository = require('../repositories/userRepository');
const model = require('../models/index');

class RequestService {
    constructor() {
        this.requestRepository = new RequestRepository(model.Request);
        this.userRepository = new UserRepository(model.User);
    }

    async getAllRequest(requests){
        return await this.requestRepository.getAll({
            ...requests,
            order: [
                ['request_id', 'ASC']
            ]
        })
    }

    async getRequestById(_id){
        return await this.requestRepository.getById(_id)
    }

    async adminReviewRequest(request){
        const requestInDb = await this.requestRepository.getById(request.request_id)
        const userInDb = await this.userRepository.getById(requestInDb.user_id)
        if(requestInDb){
            requestInDb.status = request.status;
            await requestInDb.save();
            if(userInDb && requestInDb.status == 'Approved'){
                userInDb.time_off_remain = userInDb.time_off_remain - requestInDb.quantity;
                await userInDb.save();
                return await this.userRepository.getAll({
                order: [
                    ['user_id', 'ASC']
                ]
            })
            }
            return await this.requestRepository.getAll({
                order: [
                    ['request_id', 'ASC']
                ]
            })
        }
        else{
            throw new Error();
        }
    }
}

module.exports = RequestService;