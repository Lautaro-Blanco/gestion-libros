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
Libro herede de ella.
*/

class EntidadBase {

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
        this._id = Date.now();
        this._titulo = titulo;
        this._autor = autor;
        this._genero = genero;
        this._anio = anio;
        this._paginas = paginas;
        this._estado = estado;
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
        if(paginas <= 0){
            throw new Error("Canntidad de paginas invalidas");
        }
        this._paginas = Number(valor);
    }

    set estado(valor){
        this._estado = valor;
    }

    toJSON(){
        return {
            id
        }
    }
}

