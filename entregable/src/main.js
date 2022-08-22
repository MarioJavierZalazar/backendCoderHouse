const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')
const ProductosApi = require('../contenedores/ContenedorMemoria')

//--------------------------------------------
// instancio servidor, socket y api

const app = express();

const productosApi = new ProductosApi()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const mensajes = [];


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('New client conected');
    //chat
    socket.emit('mensajes', mensajes);
    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes',mensajes);
    });
    //productos
    socket.emit('productos', productosApi);
    socket.on('new-producto', data => {
        productosApi.save(data);
        const productos = productosApi.listAll()
        io.sockets.emit('productos', productos);
    });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
