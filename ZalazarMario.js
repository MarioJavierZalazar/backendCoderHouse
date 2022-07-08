class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libro = [];
        this.mascota = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascota.push(mascota);
    }

    countMascota(){
        return this.mascota.length;
    }

    addBook(titulo,autor){
        this.libro.push({nombre: titulo, autor: autor});
    }

    getBookNames(){
        let bookNames = this.libro.map((book) => {
            return book.nombre
        });

        return bookNames;

    }
}


const usuario1 = new Usuario('pablo','sanchez')


console.log(usuario1.getFullName());
usuario1.addMascota('gato');
usuario1.addMascota('perro');
console.log(usuario1.countMascota());
usuario1.addBook('La noche de los muertos', 'Samuel L. Smith');
usuario1.addBook('Vanish', 'Sophia Jordan');
console.log(usuario1.getBookNames());