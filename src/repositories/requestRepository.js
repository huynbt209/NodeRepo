const BaseRepository = require('./baseRepository');

class RequestRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }
}

module.exports = RequestRepository;