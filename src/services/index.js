const IndexRepository = require('../repositories/index');
const model = require('../models/index');
const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const SECRET_KEY =process.env.SECRET_KEY;

class IndexService {
    constructor() {
        this.indexRepository = new IndexRepository(model.User);
    }

    async checkLogin(account) {
        const user = await this.indexRepository.getOne({
          where:{username: account.username}, 
          include: [
            { 
              model: model.Role,
              as: "role",
            },
          ],
        });
        if (!user) {
          return false; 
        }
        const password = Base64.stringify(hmacSHA512(sha256(account.password).toString(), SECRET_KEY));
        if (password != user.password) {
          return false;
        }
        return user;
    }

    async addSessions(req, res, user) {
      req.session.userName=user.username;
      req.session.role=user.role.role_name;
      req.session.userId=user.user_id;
      return true;
    }

    async destroySessions(req, res) {
      req.session.destroy();
    }
}

module.exports = IndexService;