import { Router } from "express";
import { cartManager } from "../data/carts.js";

const cart = new cartManager('./data/carts.json')

const route = Router();

route.post('/', async (req, res) =>{
    const cartCreate = await cart.createCart()
    if(cartCreate){
        await res.status(201).send({id: cartCreate})
    }else{
        await res.status(400).send({error: 'Error al crear el carrito'})
        return
    }
})

route.post('/:cid', async (req, res) =>{
    const cid = Number(req.params.cid)
    const product = await cart.getCartProductsById(cid);

    (!product) ? res.status(404).send('Id de carrito inexistente') : res.status(201).send(product)
})

route.post('/:cid/product/:pid', async (req, res) =>{
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
        
    if((typeof pid === "number") && (typeof cid === "number")){
        const agregarProduct = await cart.addProductToCart(pid, cid)

        if(agregarProduct === undefined){
            res.status(404).send(`Un dato no fue encontrado en la db , revisalo.`);
        }else{
            res.status(201).send('Producto agregado correctamente')
        } 
    }else{
        res.status(404).send('No enviaste un numero de ID valido')
    }

})

export default route