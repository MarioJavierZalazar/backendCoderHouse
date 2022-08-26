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


carritosRouter.get('/', async (req, res) => {
    res.send(await carritosApi.getAll());
})
carritosRouter.post('/' , async (req, res) => {
    let product = req.body
    let value = await carritosApi.save(product);
    console.log(value);
    res.json({id: value});
})

carritosRouter.delete('/:id', soloAdmins ,async (req, res) => {
    const { id } = req.params;
    await carritosApi.deleteById(parseInt(id));
    res.send(await carritosApi.getAll());
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

module.exports = app