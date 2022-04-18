const BaseRepository = require('./baseRepository');

class AdminRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }
}

module.exports = AdminRepository;