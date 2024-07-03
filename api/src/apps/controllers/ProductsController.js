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
        return res.send({message: "Produto criado com sucesso!"})
    }
}
module.exports = new ProductsController();