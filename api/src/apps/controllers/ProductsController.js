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
        let { page, size} = req.query;
        
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 5;

        const offset = (page - 1) * size;
        const { rows: products, count: total } = await Products.findAndCountAll({
            offset,
            limit: size,
        });
        const totalPages = Math.ceil(total / size);

        return res.status(201).json({products, total, totalPages})
    }
}
module.exports = new ProductsController();