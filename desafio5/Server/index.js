import express from 'express'
import configureHandlebars from './lib/handlebars/hbs.middleware.js'
import productRoute from './routes/products.route.js'
import cartRoute from './routes/carts.route.js'
import fileDirName from './utils/fileDirName.js'
import homeRoute from './public/js/home.js'
import configureSocket from './socket/configure-socket.js'
const { __dirname } = fileDirName(import.meta)

const app = express()

app.use(express.json())
// Para que el res.body pueda tener cualquier tipo de valor y no solo texto
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));


configureHandlebars(app)

// Rutas
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/', homeRoute)

const port = 8080
const httpServer = app.listen(port, () => 
    console.log(`Servidor express escuchando en el puerto ${port}`)
)

configureSocket(httpServer)