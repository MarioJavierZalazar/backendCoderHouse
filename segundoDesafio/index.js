const Container = require('./clases');
// Ejecucion del codigo



const main = async () => {
    const products = new Container('productos.txt');

    console.log('Cargamos el primer producto');
    let newProduct = await products.save(({title: 'Escuadra',price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
    console.log(newProduct);

    console.log('Cargamos el segundo producto');
    let newProduct2 = await products.save(({title: 'Calculadora', price: 234.56, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}))
    console.log(newProduct2);

    console.log('Cargamos el tercer producto');
    let newProduct3 = await products.save(({title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'}))
    console.log(newProduct3);

    console.log('Mostramos todos los productos');
    let allProducts = await products.getAll();
    console.log(allProducts);

    let searchById = 1
    console.log(`Mostamos el producto con el id: ${searchById}`);
    let productById = await products.getById(searchById);
    console.log(productById);

    let productToDeleteById = 2
    console.log(`Eliminamos el producto con el id: ${productToDeleteById}`);
    await products.deleteById(productToDeleteById);

    console.log('Eliminamos todo el archivo que creamos');
    await products.deleteAll();

};


main();

// Agregamos un producto nuevo y se crea el archivo
// products.save({title: 'Escuadra',price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'});

// sumamos varios productos al arvhico ya creado
// Producto 2
//  products.save({title: 'Calculadora', price: 234.56, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'});
// Producto 3
//  products.save({title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'});

//obtenemos un producto por ID
// products.getById(2);

//obtenemos todos los productos
// console.log(products.getAll());

//Eliminamos un producto por id
// products.deleteById(2);

// Borramos todos los productos y archivo
// products.deleteAll();

