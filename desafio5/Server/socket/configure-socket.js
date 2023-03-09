import { Server } from 'socket.io'
import { ProductManager } from '../data/productos.js'
const productManager = new ProductManager('./data/products.json')

export default function configureSocket(httpServer){
    const socketServer = new Server(httpServer)
    socketServer.on('connection', (socket) =>{
        console.log('socket conectado')
        socket.emit('products_actuales', productManager.products)

    })

}