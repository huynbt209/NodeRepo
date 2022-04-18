const AdminRepository = require('../repositories/adminRepository');
const model = require('../models/index');
const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const axios = require('axios');
const SECRET_KEY =process.env.SECRET_KEY;

class AdminService {
    constructor() {
        this.adminRepository = new AdminRepository(model.User);
    }

    async createNewUser(user) {
        if (user.password !== user.confirmPassword) {
            throw new Error('Password and confirm password do not match');
        }
        const userInDb = await this.adminRepository.getOne({where:{username: user.username}});
        if (userInDb) {
            throw new Error('Username already exists');
        }
        user.role_id = process.env.STAFF
        user.password = Base64.stringify(hmacSHA512(sha256(user.password).toString(), SECRET_KEY));
        return await this.adminRepository.create(user);
    }

    async getAllUser(users) {
        return await this.adminRepository.getAll({
            ...users,
            order: [
                ['user_id', 'ASC']
            ]
        })
    }

    async getUserDetail(id) {
        return await this.adminRepository.getAll({ where: {user_id: id}, include: [{ 
            model: model.Request,
            as: 'request',
            required: true
        }]});
    }

    async lockOrUnlockUser(data) {
        let user = await this.adminRepository.getOne({where:{user_id: data.userId}});
        user.is_locked = data.isLock;
        user.save();
        return user;
    }

    async getUserById(user_id){
        return await this.adminRepository.getById(user_id);
    }
    
    async updateUser(data){
        const user =  await this.adminRepository.getById(data.user_id);
        if(user){
            user.full_name = data.fullname;
            user.username = data.username;
            user.email = data.email;
            user.time_off_total = data.timeTotal;
            user.time_off_remain = data.timeRemain;
            await user.save();
            return await this.adminRepository.getAll({
                order: [
                    ['user_id', 'ASC']
                ]
            })
        } else {
            throw new Error();
        }
    }

    async sendGeneralMessage(message) {
        return await axios.post(process.env.SLACK_GENERAL, {"text": message});
    }    
}

module.exports = AdminService;