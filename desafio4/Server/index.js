import express from 'express'
import productRoute from './routes/products.route.js'
import cartRoute from './routes/carts.route.js'

const app = express()
app.use(express.json())
// Para que el res.body pueda tener cualquier tipo de valor y no solo texto
app.use(express.urlencoded({extended:true}))

// Rutas
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)

const port = 8080
app.listen(port, () => 
    console.log(`Servidor express escuchando en el puerto ${port}`)
)