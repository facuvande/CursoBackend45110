import express from 'express'
import configureHandlebars from './src/lib/handlebars/hbs.middleware.js'
import productRoute from './src/routes/products.route.js'
import cartRoute from './src/routes/carts.route.js'
import fileDirName from './src/utils/fileDirName.js'
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

app.get('/', (req, res) =>{
    res.render('home')
})

const port = 8080
app.listen(port, () => 
    console.log(`Servidor express escuchando en el puerto ${port}`)
)