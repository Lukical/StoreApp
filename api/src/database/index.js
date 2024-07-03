const Sequelize = require('sequelize');
const databaseConfig = require('../configs/db');
const Products = require('../apps/models/Products');
const models = [Products];

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map((model)=> model.init(this.connection));
    }
}
module.exports = new Database();
