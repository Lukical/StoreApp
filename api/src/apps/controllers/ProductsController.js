const { Sequelize } = require("sequelize");
const { Op } = Sequelize;
const Products = require("../models/Products");

class ProductsController{
    async create(req, res){
        const verifyProduct = await Products.findOne({
            where: {
                name: req.body.name
            }
        })
        if(verifyProduct){
            return res.status(400).json({message: "Produto já existente em Produtos!"})
        }
        const product = await Products.create(req.body);
        if(!product){
            return res.status(400).json({message: "Falha a criar produto!"})
        }
        return res.status(201).json({message: "Produto criado com sucesso!"})
    }
    async getProducts(req, res){
        let { page, size, name, brand} = req.query;
        console.log(req.query)
        
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 6;
        name = name ? name : "";
        brand = brand ? brand : "";
        console.log(brand)
        const offset = (page - 1) * size;

        const where = {};
        if(name){
            where.name = {
                [Op.like]: `%${name}%`
            }
        }
        if(brand){
            where.brand = {
                [Op.like]: `%${brand}%`
            };
        }
        try {
            const { rows: products, count: total } = await Products.findAndCountAll({
                where,
                offset,
                limit: size,
            });
            const totalPages = Math.ceil(total / size);
            return res.status(201).json({products, total, totalPages})
        } catch (error) {
            return res.status(500).json({message: error})
        }   
    }
    async delete(req, res){
        const { id } = req.params;
        const verifyProduct = await Products.findOne({
            where: {
                id
            }
        });
        if(!verifyProduct) return res.status(404).json({message: "Produto não existe!"});
        const deletedProduct = await Products.destroy({
            where: {
                id
            }
        })
        if(!deletedProduct) return res.status(400).json({message: "Falha ao deletar produto!"});
        return res.status(200).json({message: "Produto deletado!"});
    }
}
module.exports = new ProductsController();