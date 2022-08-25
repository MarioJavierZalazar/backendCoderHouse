const { promises : fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(objet) {
        if (fileExists(this.ruta)) {
            try {
                let products = await this.getAll()
                let newLastItem = products[products.length - 1].id + 1;
                objet.id = newLastItem;
                products.push(objet)
                await fs.writeFile(this.ruta, JSON.stringify(products))
                return newLastItem;
            } catch (error) {
                throw new Error('Error al guardar')
            }

        } else {
            objet.id = 1;
            let newProduct = [];
            newProduct.push(objet)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(newProduct))
                return objet.id

            } catch (error) {
                throw new Error('Error al guardar')
            }
        }
    }

    async getById(id) {
        if (fileExists(this.ruta)) {
            const products = await this.getAll();
            let foundById = products.find(product => product.id == id);
            return foundById;
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }

    async getAll() {
        try {
            let products = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        if (fileExists(this.ruta)) {
            let products = await this.getAll()
            let productToDelete = products.findIndex(product => product.id === id);
            products.splice(productToDelete, 1);
            await fs.writeFile(this.ruta, JSON.stringify(products));
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }

    async deleteAll() {
        if (fileExists(this.ruta)) {
            await fs.unlink(this.ruta);
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }
}


// Helpers
const fileExists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (err) {
        return false;
    }
}


module.exports = ContenedorArchivo