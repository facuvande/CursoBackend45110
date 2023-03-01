import { Router } from "express";
import { ProductManager } from "../data/productos.js";
import { validarProducto, validarProductoParcial } from "../data/validacion.js";
import { imgsUploader } from "../utils/imgsUploader.js";
import fs from 'fs'
const productoManager = new ProductManager('./data/products.json')

const route = Router();

route.get('/', async (req, res) =>{
    const productos = productoManager.getProducts()
    const limit = req.query.limit;

    (limit && !isNaN(Number(limit))) ? await res.status(201).send(productos.slice(0, limit)) : await res.status(201).send(productos)
})

route.get('/:pid', async (req, res) =>{
    const productos = productoManager.getProducts()
    const pid = req.params.pid;

    if(pid && !isNaN(Number(pid))){
        const respuesta = productos.find((e) => e.id === Number(pid))
        if(!respuesta) {
            await res.status(404).send(`El producto con la id ${pid} no existe`)
            return
        }else{
            return res.status(202).send(respuesta)
        } 
    }else{
        await res.status(400).send('Ingresaste un caracter invalido')
    }
})


route.post('',imgsUploader.array('file', undefined) ,async (req, res)=>{
    const producto = req.body;
    const img = req.files

    
    // Debido a que si ponemos mas de una imagen req.files me otorga 2 objetos 1 por imagen, no puedo acceder con req.files.filename por lo tanto uso este metodo para extraer sus respectivos filename y guardarlo en la constante filenames
    const filenames = []

    for(const key in img){
        if(img.hasOwnProperty(key)){
            const files = img[key];
            
            if(Array.isArray(files)){
                files.forEach(file =>{
                    filenames.push(file.filename)
                })
            }else{
                filenames.push(files.filename)
            }
            
        }
    }
    const status = producto.status;
    if(!status){
        producto.status = 'true'
    }
    
    producto.price = Number(producto.price)
    producto.stock = Number(producto.stock)
    
    const esValidoElProducto = validarProducto(producto)
    if(!esValidoElProducto){
        res.status(400).send({
            error: 'Datos ingresados invalidos, revisalo!'
        });
    }else{
        const id = await productoManager.addProducts({...producto, thumbnail: filenames})
        res.status(201).send({id})
    }
})

route.put('/:pid', async (req, res) => {
    const idProducto = Number(req.params.pid);
    const Producto = await productoManager.getProductsById(idProducto);

    if (!Producto) {
        res.status(404)
            .send({ error: `El producto con el id ${idProducto} no fue encontrado` });
        return;
    }
    const nuevosDatos = req.body;

    const esValido = validarProductoParcial(nuevosDatos);
    if (!esValido) {
      res.status(400).send({
        error: 'Datos inválidos',
      });
      return;
    }
    await productoManager.updateProduct(idProducto, nuevosDatos);
    res.status(202).send({ ok: true });
});

route.delete('/:pid', async(req, res) =>{
    const idProducto = Number(req.params.pid)
    const Producto = await productoManager.getProductsById(idProducto)
    if(!Producto){
        res.status(404).send({Error: `El producto con el id ${idProducto} no fue encontrado`})
        return;
    }

    await productoManager.deleteProduct(idProducto) 
    res.status(200).send({ok: true})
})

export default route;