import express from 'express'
import { productManager } from '../desafio3/productos.js'

const app = express()

app.get('/products', async (req, res) =>{
    const productos = productManager.getProducts()

    const limit = req.query.limit;
    (limit && !isNaN(Number(limit))) ? await res.send(productos.slice(0, limit)) : await res.send(productos)
})

app.get('/products/:pid', async (req, res) =>{
    const productos = productManager.getProducts()
    const pid = req.params.pid;

    if(pid && !isNaN(Number(pid))){
        const respuesta = productos.find((e) => e.id === Number(pid))
        if(!respuesta) {
            await res.send(`El producto con la id ${pid} no existe`)
            return
        }else{
            return res.send(respuesta)
        } 
    }else{
        await res.send('Ingresaste un caracter invalido')
    }
})

const port = 8080
app.listen(port, () => 
    console.log(`Servidor express escuchando en el puerto ${port}`)
)
