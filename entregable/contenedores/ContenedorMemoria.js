class ContenedorMemoria {
    constructor() {
        this.productos = [
        ]
    }

    list(id) {
        let productFinder = this.productos.find(p => p.id == id);
        return productFinder;
    }

    listAll() {
        return this.productos;
    }

    save(prod) {
        if (this.productos.length > 0){
            let newLastItem  = this.productos[this.productos.length - 1].id + 1;
            prod.id = newLastItem;
            this.productos.push(prod)
        } else {
            prod.id = 1
            this.productos.push(prod)
        }
        
    }

    update(prod, id) {
        let productToUpdate = this.productos.findIndex(p => p.id === id);

            this.productos[productToUpdate].title = prod.title;
            this.productos[productToUpdate].price = prod.price;
            this.productos[productToUpdate].thumbnail = prod.thumbnail;
    }

    delete(id) {
        let productToDelete = this.productos.findIndex(p => p.id === id);
        this.productos.splice(productToDelete,1);      
    }
}

module.exports = ContenedorMemoria
