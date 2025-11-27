// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    }
];

// Elementos del DOM.
// getElementById -> permite seleccionar un elemento del DOM usando su atributo "id".
// querySelector -> permite seleccionar elementos del DOM usando selectores CSS (id, clase, etiqueta, atributos...).
// 
// Elemento en el que se colocan todos los datos de los productos.
const contenedorProductos = document.querySelector("#contenedor-productos")
// Array con todos los botones que tengan asignada la clase "boton-categoria".
// Añadiremos un eventListener a cada botón para que suceda algo cuando hagamos clic sobre ellos.
const botonesCategorias = document.querySelectorAll(".boton-categoria")
// Título de la categoría de productos.
const tituloPrincipal = document.getElementById("titulo-principal")

// Sólo cargamos los productos de la categoría elegida en los botones del menú.
function cargarProductos(productosElegidos) 
{
    contenedorProductos.innerHTML = ""

    productosElegidos.forEach(producto => {
        const divProducto = document.createElement("div")
        
        divProducto.classList.add("producto")

        divProducto.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `

        contenedorProductos.append(divProducto)
    }) 
}

// La primera vez que cargue la página, cargamos todos los productos.
cargarProductos(productos)

// Es mejor usar "currentTarget" que "target" a la hora de gestionar el evento, porque con "target"
// dependemos del elemento sobre el que hayamos hecho clic. Si lo hemos hecho sobre el icono de la 
// manita no funcionará, a pesar de ser un hijo del elemento "button", el navegador interpretará que 
// el target fue el icono y no el "button". Sí funcionará si hemos hecho clic sobre el botón, pero es
// un poco lotería que así vaya a suceder siempre.
// "currentTarget", por tanto, toma como elemento clicable a todo aquello que está dentro del "button", 
// da igual si es el propio botón o sus accesorios, como lo son en este caso los iconos.

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        // Primero quitamos la clase "active" a todos los botones.
        botonesCategorias.forEach(boton => 
            boton.classList.remove("active")
        )

        // Luego añadimos la clase "active" al botón que recibió el clic.
        evento.currentTarget.classList.add("active")

        // Cargamos los productos asociados al botón que recibió el clic.
        if (evento.currentTarget.id == "todos")
        {
            cargarProductos(productos)
            tituloPrincipal.innerText = "Todos los productos"
        }
        else
        {
            const productosElegidos = productos.filter(producto => producto.categoria.id == evento.currentTarget.id)
            cargarProductos(productosElegidos)
            const productoCategoriaElegida = productosElegidos.find(producto => producto.categoria.id == evento.currentTarget.id)
            tituloPrincipal.innerText = productoCategoriaElegida.categoria.nombre
        }
    })
})

// Eliminamos 