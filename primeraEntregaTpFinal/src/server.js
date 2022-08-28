const express = require('express')
const { Router } = express

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor y persistencia

const app = express()

const productosApi = new ContenedorArchivo('dbProductos.json')
const carritosApi = new ContenedorArchivo('dbCarritos.json')

//--------------------------------------------
// permisos de administrador

const esAdmin = true

const crearErrorNoEsAdmin = (ruta, metodo) => {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

const  soloAdmins = (req, res, next) => {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    res.send(await productosApi.getAll());
})
productosRouter.post('/', soloAdmins ,async (req, res) => {
    await productosApi.save(req.body);
    res.send(await productosApi.getAll());
})

productosRouter.put('/:id', soloAdmins ,async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    await productosApi.actualizar(product,parseInt(id));
    res.send(await productosApi.getAll());
})

productosRouter.delete('/:id', soloAdmins ,async (req, res) => {
    const { id } = req.params;
    await productosApi.deleteById(parseInt(id));
    res.send(await productosApi.getAll());
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()


carritosRouter.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const carrito = await carritosApi.getById(parseInt(id));
    res.send(carrito.productos);
})

carritosRouter.post('/:id/productos' , async (req, res) => {
    const { id } = req.params;
    let producto = req.body.id;
    console.log(id);
    const carrito = await carritosApi.getById(parseInt(id));
    const productos = await productosApi.getById(parseInt(producto));
    if (carrito.productos){
        carrito.productos.push(productos)
    } else {
        carrito.productos = [productos];
    }
    console.log(carrito);
    await carritosApi.actualizar(carrito, parseInt(id))
    res.json(carrito);
})

carritosRouter.post('/' , async (req, res) => {
    let product = req.body
    product.productos = [];
    let value = await carritosApi.save(product);
    res.json(value);
})

carritosRouter.delete('/:id', soloAdmins ,async (req, res) => {
    const { id } = req.params;
    await carritosApi.deleteById(parseInt(id));
})
carritosRouter.delete('/:id/productos/:idProd', soloAdmins ,async (req, res) => {
    const { id, idProd } = req.params;
    const carrito = await carritosApi.getById(parseInt(id));
    let productoABorrar = carrito.productos.findIndex(product => product.id == idProd);
    carrito.productos.splice(productoABorrar, 1);
    await carritosApi.actualizar(carrito, parseInt(id))
})

carritosRouter.get('/', async (req, res) => {
    const listaCarrito = await carritosApi.getAll();
    const lista = [];
    for (const item of listaCarrito) {
        lista.push(item.id)
    }
    console.log(lista);
    res.json(lista);
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

module.exports = app