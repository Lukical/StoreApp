const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Products extends Model{
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                brand: Sequelize.STRING,
                description: Sequelize.STRING,
                price: Sequelize.DOUBLE,
                img: Sequelize.STRING
            },{sequelize}
        )
        return this;
    }
}
module.exports = Products;