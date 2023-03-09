import { Router } from "express"
import { ProductManager } from "../../data/productos.js";

const productManager = new ProductManager('./data/products.json')
const route = Router()

route.get('/', async (req, res) =>{

    const products = await productManager.getProducts()

    res.render('home', {
        data: products
    })
})

route.get('/realtimeproducts', async (req, res) =>{
    const products = await productManager.getProducts()

    res.render('realTimeProducts',{
        data: products
    })
})

export default route