const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const ProductsController = require('./apps/controllers/ProductsController');
const productsSchema = require('./schema/create.products.schema.json');

const routes = new Router();

routes.get("/health", (req, res)=>{
    return res.send({message: 'Connected with sucess!'})
})

routes.get("/products", ProductsController.getProducts);
routes.post("/products", schemaValidator(productsSchema), ProductsController.create);

module.exports = routes;