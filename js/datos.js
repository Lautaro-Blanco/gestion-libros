const datosIniciales = [
    {
        titulo: "Drácula",
        autor: "Bram Stoker",
        genero: "Terror",
        anio: 1897,
        paginas: 418,
        estado: "Leido"
    },
    {
        titulo: "Frankenstein",
        autor: "Mary Shelley",
        genero: "Terror",
        anio: 1818,
        paginas: 280,
        estado: "Leyendo"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        genero: "Ficcion",
        anio: 1949,
        paginas: 328,
        estado: "Leido"
    },
    {
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        genero: "No Ficcion",
        anio: 2011,
        paginas: 443,
        estado: "Leyendo"
    },
    {
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        genero: "Romance",
        anio: 1813,
        paginas: 432,
        estado: "Pendiente"
    }
];

if(miBiblioteca.totalLibros() === 0){
    datosIniciales.forEach(dato => {
        miBiblioteca.agregarLibro(new Libro(dato.titulo, dato.autor, dato.genero, dato.anio, dato.paginas, dato.estado));
    });

    renderizarTabla();
    actualizarEstadisticas();
}