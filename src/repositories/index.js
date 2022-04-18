const BaseRepository = require('./baseRepository');

class IndexRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }
}

module.exports = IndexRepository;