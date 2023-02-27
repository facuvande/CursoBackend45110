import fs from 'fs'
import { ProductManager } from './productos.js';
const productManager = new ProductManager('./data/products.json')

export class cartManager{
    constructor(path) {
        this.path = path;
        // this.products = this.readFile();
    }

    async createCart() {  
        //Creo la variable utilizando this.readfile
        const carritosCargados = await this.getCarts();
        let id = 0;
        id = carritosCargados.length > 0 ? carritosCargados[carritosCargados.length - 1].id + 1 : 1;
        
        const nuevoCarrito = [...carritosCargados, {id: id, products: []}]
        const datosStr = JSON.stringify(nuevoCarrito)
        
        await fs.promises.writeFile(this.path, datosStr)
        return id
    }

    async getCarts(){
        try {
            const data = await fs.promises.readFile(this.path)
            return JSON.parse(data)
        } catch (error) {
            console.log(`Error: ${error}`)
            return []
        }
    }

    async getCartsById(id){
        const todosLosCarts = await this.getCarts()
        try {
            const cartATraer = todosLosCarts.find((c) => c.id === id);
            if(cartATraer == undefined){
                return
            }else{
                return cartATraer
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCartProductsById(id){
        const cartSeleccionado = await this.getCartsById(id)
        try {
            return cartSeleccionado.products
        } catch (error) {
            return
        }
        
    }

    async addProductToCart(productId, cartId){
        const todosLosCarritos = await this.getCarts()
        // Traemos el carrito con la id pasada
        const cartSeleccionado = await this.getCartsById(cartId);
        // Corroboramos que exista el producto
        const productoSeleccionado = productManager.getProductsById(productId)
        if((productoSeleccionado == undefined) || (cartSeleccionado == undefined)){
            return
        }
        let productExiste = cartSeleccionado.products.some(obj => obj.id === productId);
        let datos = {id: productId, quantity: 1}
        
        let objetoAEditar = todosLosCarritos.find(obj => obj.id === cartId);

        if(productExiste){
            let productAEditar = objetoAEditar.products.find(obj => obj.id === productId)
            productAEditar.quantity++
        }else{
            objetoAEditar.products.push(datos);
        }

        
        let index = todosLosCarritos.findIndex(obj => obj.id === cartId);
        todosLosCarritos.splice(index, 1, objetoAEditar);

        const datosStr = JSON.stringify(todosLosCarritos)
        await fs.promises.writeFile(this.path, datosStr)

        return productId
    }

}


