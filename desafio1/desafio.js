class ProductManager{
    products = []
    static id = 1;
    constructor(){
        this.products = [];
    }
    addProduct(title , description, price, thumbnail, code, stock){
        const producto = ({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id : ProductManager.id
        })

        if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock){
            throw new Error('todos los datos son obligatorios')
        }

        const codeVerificador = this.products.find(element => element.code === producto.code)
        if(codeVerificador){
            return console.log('Ya existe un producto con este code')
        }

        this.products.push(producto)
        ProductManager.id++;
    }
    getProducts(){
        return console.log(this.products)
    }
    getProductById(id){
        const productoPorId = this.products.find(element => element.id === id)
        productoPorId ? console.log(productoPorId) : console.log ('Not Found')
    }
}


const prod1 = new ProductManager();
prod1.addProduct('Colchoneta', 'Colchoneta Inflable', 300, '###', 134, 12)

prod1.getProducts()

prod1.addProduct('Alfajor', 'Alfajor Jorgito', 500, '###', 1544, 1234)
prod1.getProducts()

prod1.getProductById(2)