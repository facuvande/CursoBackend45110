const products = []

class ProductManager{
    static id = 1;
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        ProductManager.id;
    }
    addProduct(){
        const producto = ({
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            id : ProductManager.id
        })

        if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock){
            throw new Error('todos los datos son obligatorios')
        }

        const codeVerificador = products.find(element => element.code === producto.code)
        if(codeVerificador){
            return console.log('Ya existe un producto con este code')
        }

        products.push(producto)
        ProductManager.id++;
    }
    getProducts(){
        return console.log(products)
    }
    getProductById(id){
        const productoPorId = products.find(element => element.id === id)
        productoPorId ? console.log(productoPorId) : console.log ('Not Found')
    }
}


const prod1 = new ProductManager('Colchoneta', 'Colchoneta Inflable', 300, '###', 134, 12);
prod1.addProduct()
const prod2 = new ProductManager('Tobogan', 'Tobogan Deslisante', 600, '##', 200, 500);
prod2.addProduct()


prod1.getProductById(5)
prod2.getProducts()