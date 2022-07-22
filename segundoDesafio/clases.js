const { promises:fs } = require('fs');

class Container {
    constructor(name) {
        this.name = `./${name}.txt`
    }

    async save(objet) {
        if (fileExists(this.name)) {
            try {
                let file = await fs.promises.readFile(this.name, 'utf-8')
                let products = JSON.parse(file)
                let lastItem = products[products.length - 1].id + 1;
                objet.id = lastItem;
                products.push(objet)
                await fs.promises.writeFile(this.name, JSON.stringify(products))
                console.log(objet.id);
            } catch (error) {
                throw new Error('Error al guardar')
            }

        } else {
            objet.id = 1;
            let newProduct = [];
            newProduct.push(objet)
            try {
                await fs.promises.writeFile(this.name, JSON.stringify(newProduct))
                console.log(objet.id);

            } catch (error) {
                throw new Error('Error al guardar')
            }
        }
    }

    async getById(id) {
        if (fileExists(this.name)) {
            try {
                let file = await fs.promises.readFile(this.name, 'utf-8');
                let products = JSON.parse(file);
                let found = products.find(product => product.id === id);
                console.log(found);
            } catch (error) {
                throw new Error('No se encuentra el ID indicado')
            }
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }

    async getAll() {
        if (fileExists(this.name)) {
            try {
                let file = await fs.promises.readFile(this.name, 'utf-8');
                let products = JSON.parse(file);
                console.log(products);
            } catch (error) {
                throw new Error('Error al leer el archivo')
            }
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }

    async deleteById(id) {
        if (fileExists(this.name)) {
            try {
                let file = await fs.promises.readFile(this.name, 'utf-8');
                let products = JSON.parse(file);
                let productDeleted = products.findIndex(product => product.id === id);
                products.splice(productDeleted, 1);
                await fs.promises.writeFile(this.name,  JSON.stringify(products));
            } catch (error) {
                throw new Error('No se encuentra el ID indicado')
            }
        } else {
            console.log('No existe el arvhico que esta buscando');
        }
    }

    async deleteAll() {
        if (fileExists(this.name)) {
            try {
                await fs.promises.unlink(this.name);
            } catch (error) {
                throw new Error('Error al borrar el archivo')
            }
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

const readFile = async (route) => {   
        let file = await fs.promises.readFile(route, 'utf-8');
        return JSON.parse(file);

}


module.exports = Container;