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
        this._id = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anio = anio;
        this.paginas = paginas;
        this.estado = estado;
    }

    get id(){ return this._id; }

    get titulo(){ return this._titulo; }

    get autor(){ return this._autor; }

    get genero(){ return this._genero; }

    get anio(){ return this._anio; }

    get paginas(){ return this._paginas; }

    get estado(){ return this._estado; }

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

    set genero(valor){ this._genero = valor; }

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

    set estado(valor){ this._estado = valor; }

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
        this.cargarDesdeLocalStorage();
    }

    agregarLibro(libro){
        if(!(libro instanceof Libro)){
            throw new Error("Solo se pueden agregar objetos Libro");
        }

        this._libros.push(libro);
        this.guardarEnLocalStorage();
    }

    eliminarLibro(id){
        const indice = this._libros.findIndex(libro => libro.id === id);

        if(indice !== -1){
            this._libros.splice(indice, 1);
            this.guardarEnLocalStorage();
        }
    }

    editarLibro(id, nuevosDatos){
        const libro = this._libros.find(libro => libro.id === id);

        if(libro){
            libro.titulo = nuevosDatos.titulo;
            libro.autor = nuevosDatos.autor;
            libro.genero = nuevosDatos.genero;
            libro.anio = nuevosDatos.anio;
            libro.paginas = nuevosDatos.paginas;
            libro.estado = nuevosDatos.estado;

            this.guardarEnLocalStorage();
        }
    }

    obtenerLibroPorId(id){ return this._libros.find(libro => libro.id === id); }

    obtenerLibros(filtroGenero = "Todos", filtroEstado = "Todos"){
        return this._libros.filter(libro => {
            const coincideGenero = filtroGenero === "Todos" || libro.genero === filtroGenero;
            const coincideEstado = filtroEstado === "Todos" || libro.estado === filtroEstado;

            return coincideGenero && coincideEstado;
        });
    }

    guardarEnLocalStorage(){
        const libroJSON = JSON.stringify(this._libros.map(libro => libro.toJSON()));
        localStorage.setItem("biblioteca", libroJSON);
    }

    cargarDesdeLocalStorage(){
        const datos = localStorage.getItem("biblioteca");

        if(datos){
            const librosParseados = JSON.parse(datos);

            this._libros = librosParseados.map(dato => {
                const libro = new Libro(
                    dato.titulo,
                    dato.autor,
                    dato.genero,
                    dato.anio,
                    dato.paginas,
                    dato.estado
                );

                libro._id = dato.id;

                return libro;
            });
        }
    }

    totalLibros(){ return this._libros.length; }

    totalPorEstado(estado){ return this._libros.filter(libro => libro.estado === estado).length; }

    totalPaginas(){ return this._libros.reduce((total, libro) => total + libro.paginas, 0); }

    promedioPaginas(){
        if(this._libros.length === 0){
            return 0;
        }

        return Math.round(this.totalPaginas() / this._libros.length);
    }
}

/*1. Instanciar un objeto Biblioteca al cargar la página: const miBiblioteca = new Biblioteca(); 
2. Crear una función renderizarTabla(libros) que vacié el tbody y genere filas tr para cada 
libro. 
3. En cada fila, agregar botones Editar y Eliminar con clases identificadoras y data-id. 
4. Capturar el evento submit del formulario, prevenir el comportamiento por defecto, 
extraer valores con FormData o accediendo a los inputs, crear un Libro y agregarlo a la 
biblioteca. 
5. Implementar delegación de eventos en la tabla para manejar clicks en Editar y Eliminar. 
6. Al hacer clic en Editar, cargar los datos del libro en el formulario y cambiar el botón a 
"Actualizar". 
7. Al hacer clic en Eliminar, mostrar confirm() antes de proceder. 
8. Actualizar la tabla y las estadísticas después de cada operación.*/

const miBiblioteca = new Biblioteca();

const formulario = document.getElementById("formulario-libro");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const tablaLibros = document.getElementById("tabla-libros");
const filtroGenero = document.getElementById("filtro-genero");
const filtroEstado = document.getElementById("filtro-estado");
const listaEstadisticas = document.getElementById("lista-estadisticas");
const botonGuardar = document.querySelector(".btn-guardar-libro");

let libroEditandoId = null;

function renderizarTabla(libros = miBiblioteca.obtenerLibros()){
    cuerpoTabla.innerHTML = "";
    
    if(libros.length === 0){
        cuerpoTabla.innerHTML = `
        <tr>
            <td colspan="7">No hay libros registrados</td>
        </tr>`;
        return;
    }

    libros.forEach(libro => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${libro.anio}</td>
        <td>${libro.paginas}</td>
        <td>${libro.estado}</td>
        <td>
            <button class="btn-editar" data-id="${libro.id}">Editar</button>
            <button class="btn-eliminar" data-id="${libro.id}">Eliminar</button>
        </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

function actualizarEstadisticas(){
    listaEstadisticas.innerHTML = `
    <li>Total de libros: ${miBiblioteca.totalLibros()}</li>
    <li>Leidos: ${miBiblioteca.totalPorEstado("Leido")}</li>
    <li>Leyendo: ${miBiblioteca.totalPorEstado("Leyendo")}</li>
    <li>Pendientes: ${miBiblioteca.totalPorEstado("Pendiente")}</li>
    <li>Total de paginas: ${miBiblioteca.totalPaginas()}</li>
    <li>Promedio de paginas: ${miBiblioteca.promedioPaginas()}</li>
    `;
}

function aplicarFiltros(){
    const genero = filtroGenero.value;
    const estado = filtroEstado.value;

    const librosFiltrados = miBiblioteca.obtenerLibros(genero, estado);

    renderizarTabla(librosFiltrados);
}

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const anio = document.getElementById("anio").value;
    const paginas = document.getElementById("paginas").value;
    const estado = document.getElementById("estado").value;

    const datosLibro = {
        titulo, autor, genero, anio, paginas, estado
    };

    try{
        if(libroEditandoId !== null){
            miBiblioteca.editarLibro(libroEditandoId, datosLibro);
            libroEditandoId = null;
            botonGuardar.textContent = "Guardar libro";
        } else {
            const nuevoLibro = new Libro(titulo, autor, genero, anio, paginas, estado);
            miBiblioteca.agregarLibro(nuevoLibro);
        }

        formulario.reset();
        renderizarTabla();
        actualizarEstadisticas();
    } catch(error){
        alert(error.message);
    }
});

tablaLibros.addEventListener("click", function(evento){
    const boton = evento.target;

    if(boton.classList.contains("btn-eliminar")){
        const id = boton.dataset.id;

        const confirmar = confirm("¿Seguro que queres eliminar este libro?");

        if(confirmar){
            miBiblioteca.eliminarLibro(id);
            renderizarTabla();
            actualizarEstadisticas();
        }
    }

    if(boton.classList.contains("btn-editar")){
        const id = boton.dataset.id;
        const libro = miBiblioteca.obtenerLibroPorId(id);

        if(libro){
            document.getElementById("titulo").value = libro.titulo;
            document.getElementById("autor").value = libro.autor;
            document.getElementById("genero").value = libro.genero;
            document.getElementById("anio").value = libro.anio;
            document.getElementById("paginas").value = libro.paginas;
            document.getElementById("estado").value = libro.estado;

            libroEditandoId = libro.id;
            botonGuardar.textContent = "Actualizar libro";
        }
    }
});

filtroGenero.addEventListener("change", aplicarFiltros);
filtroEstado.addEventListener("change", aplicarFiltros);

renderizarTabla();
actualizarEstadisticas();