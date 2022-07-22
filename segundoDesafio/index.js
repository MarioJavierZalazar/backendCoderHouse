const Container = require('./clases');
// Ejecucion del codigo

const products = new Container('productos')


// Agregamos un producto nuevo y se crea el archivo
products.save({title: 'Escuadra',price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'});

// sumamos varios productos al arvhico ya creado
// Producto 2
//  products.save({title: 'Calculadora', price: 234.56, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'});
// Producto 3
//  products.save({title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'});

//obtenemos un producto por ID
// products.getById(2);

//obtenemos todos los productos
// products.getAll();

//Eliminamos un producto por id
// products.deleteById(2);

// Borramos todos los productos y archivo
// products.deleteAll();

