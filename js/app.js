/*1. Crear el archivo js/app.js.
2. Definir la clase Libro con propiedades privadas: _id, _titulo, _autor, _genero, _anio,
_paginas, _estado.
3. El constructor recibe todos los valores excepto id, que se genera automáticamente con
Date.now().
4. Implementar getters para todas las propiedades.
5. Implementar setters que validen datos (ej: año debe ser número entre 1000 y 2099).
6. Agregar un método toJSON() que devuelva un objeto plano para poder serializar.
7. Agregar un método toString() que devuelva una descripción legible del libro.
8. Crear una clase abstracta EntidadBase que lance error si se instancia directamente, y que
Libro herede de ella.*/

class EntidadBase {
    constructor(){
        if(this.constructor === EntidadBase){
            throw new Error("No se puede instanciar una clase abstracta");
        }
    }
}

class Libro extends EntidadBase {
    _id;
    _titulo;
    _autor;
    _genero;
    _anio;
    _paginas;
    _estado;

    constructor(titulo, autor, genero, anio, paginas, estado){
        super();
        this._id = Date.now();
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anio = anio;
        this.paginas = paginas;
        this.estado = estado;
    }

    get id(){
    return this._id;
    }

    get titulo(){
        return this._titulo;
    }

    get autor(){
        return this._autor;
    }

    get genero(){
        return this._genero;
    }

    get anio(){
        return this._anio;
    }

    get paginas(){
        return this._paginas;
    }

    get estado(){
        return this._estado;
    }

    //Validaciones
    set titulo(valor){
        if(valor.trim() === ""){
            throw new Error("Titulo invalido");
        }
        this._titulo = valor;
    }

    set autor(valor){
        if(valor.trim() === ""){
            throw new Error("Autor invalido");
        }
        this._autor = valor;
    }

    set genero(valor){
        this._genero = valor;
    }

    set anio(valor){
        if(valor < 1000 || valor > 2099){
            throw new Error("Año invalido");
        }
        this._anio = Number(valor);
    }

    set paginas(valor){
        if(valor <= 0){
            throw new Error("Canntidad de paginas invalidas");
        }
        this._paginas = Number(valor);
    }

    set estado(valor){
        this._estado = valor;
    }

    toJSON(){
        return {
            id: this._id,
            titulo: this._titulo,
            autor: this._autor,
            genero: this._genero,
            anio: this._anio,
            paginas: this._paginas,
            estado: this._estado
        };
    }

    toString(){
        return `${this._titulo} - ${this._autor} (${this._anio})`;
    }
}

/*1. Crear la clase Biblioteca que actuara como gestor de la colección de libros.
2. La clase Biblioteca debe tener una propiedad privada _libros (array vacío inicialmente).
3. Implementar método agregarLibro(libro) que agregue un objeto Libro al array con push().
4. Implementar método eliminarLibro(id) que busque el índice con findIndex() y elimine
con splice().
5. Implementar método editarLibro(id, nuevosDatos) que encuentre el libro y actualice sus
propiedades.
6. Implementar método guardarEnLocalStorage() que use JSON.stringify() sobre el array de
objetos toJSON() y lo almacene con localStorage.setItem('biblioteca', ...).
7. Implementar método cargarDesdeLocalStorage() que recupere el string, lo parse con
JSON.parse(), y reconstruya instancias de Libro usando Object.assign o creando nuevas
instancias.
8. Implementar método obtenerLibros(filtroGenero = 'Todos', filtroEstado = 'Todos') que
use filter() para devolver solo los libros coincidentes*/

class Biblioteca {
    _libros;

    constructor(){
        this._libros = [];
    }

    agregarLibro(libro){
        if(!(libro instanceof Libro)){
            throw new Error("Solo se pueden agregar objetos Libro");
        }

        this._libros.push(libro);
    }

    eliminarLibro(id){
        const indice = this._libros.findIndex(libro => libro.id === id){
            
        }
    }

}