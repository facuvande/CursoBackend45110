import fs from 'fs'

export class ProductManager {
    constructor(path) {
    this.path = path;
    this.products = this.readFile();
    }

    readFile() {
        try {
            const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
            return data;
        } catch (error) {
            return []
        }
    }
    
    writeData(data) {
        let dataString = JSON.stringify(data);
        fs.writeFileSync(`./${this.path}`, dataString);
    }


    addProducts(product) {  
        //Creo la variable utilizando this.readfile
        let listado = this.readFile();
        const checkInCart = listado.find(p => p.code === product.code)

        if (!product.title 
            // || !product.description || !product.price ||
            
            // !product.status|| !product.code || !product.stock || !!product.category
            ) {
                
                throw new Error('Todos los campos son obligatorios'); 
            } else if (checkInCart){
                console.log("ERROR - Please check the information and try again")
                return 
            }
        else {
            product.id = listado.length > 0 ? listado[listado.length - 1].id + 1 : 1;
            listado.push(product)
            this.writeData(listado)
            return product.id
        }

    }

    getProducts () {
        try {
            const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
            return data;
            } catch (error) {
                return []
            }    
        }


    // const isInCart = (id) => { return products.find (product =>product.title ===title) }


    getProductsById (id){
        const products = this.readFile();
        const search = products.find(product => product.id === id) 
        if (search == undefined) {
            console.log( "Product not found")
        }else {
            return search 
        }
    }

    isInProducts  (title)  {
        products.find (prod => prod.title === title)
    }

    async updateProduct(id, product){
        const productoCargado = await this.getProductsById(id)
        if(!productoCargado){
            throw new Error('Producto no encontrado')
        }
        const todosLosProductos = await this.getProducts()
        const productoModificado = {...productoCargado, ...product}
        const productosSinElCargado = todosLosProductos.filter(e => e.id !== id)
        const nuevosProductos = [...productosSinElCargado, productoModificado]
        const datosStr = JSON.stringify(nuevosProductos)
        await fs.promises.writeFile(this.path, datosStr)
    }


    async deleteProduct (id){
        let productos = await  this.readFile() 
        try {
        productos = productos.filter (producto =>producto.id != id )
        this.writeData(productos)
            
        } catch (err) {
            console.log("Oops! There has been a mistake")
        }
    }

    deleteAll(){
        this.writeFile([])
    }

    // Carrito
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
        const allCarts = await this.getCarts()
        try {
            const cartATraer = allCarts.find((c) => c.id === id);
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
        const selectCart = await this.getCartsById(id)
        try {
            return selectCart.products
        } catch (error) {
            return
        }
        
    }

    async addProductToCart(productId, cartId){
        const allCarts = await this.getCarts()
        // Traemos el carrito con la id pasada
        const selectCart = await this.getCartsById(cartId);
        // Corroboramos que exista el producto
        const selectProduct = productManager.getProductsById(productId)
        if((selectProduct == undefined) || (selectCart == undefined)){
            return
        }
        const productExiste = selectCart.products.some(obj => obj.id === productId);
        let datos = {id: productId, quantity: 1}
        
        let objectToEdit = allCarts.find(obj => obj.id === cartId);

        if(productExiste){
            const productToEdit = objectToEdit.products.find(obj => obj.id === productId)
            productToEdit.quantity++
        }else{
            objectToEdit.products.push(datos);
        }

        
        let index = allCarts.findIndex(obj => obj.id === cartId);
        allCarts.splice(index, 1, objectToEdit);

        const datosStr = JSON.stringify(allCarts)
        await fs.promises.writeFile(this.path, datosStr)

        return productId
    }
}


const productManager = new ProductManager('./data/products.json')
