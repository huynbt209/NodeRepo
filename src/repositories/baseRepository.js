class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getOne(query) {
        return await this.model.findOne(query);
    }
    async create(item) {
        return await this.model.create(item);
    }
    async getAll(all) {
        return await this.model.findAll(all);
    }
    async getById(_id){
        return await this.model.findByPk(_id);
    }  

}

module.exports = BaseRepository; 