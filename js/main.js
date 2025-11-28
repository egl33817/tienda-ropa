// Array para almacenar los productos que están en "productos.json".
let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        // La primera vez que cargue la página, cargamos todos los productos.
        cargarProductos(productos)
    })

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
// Array con todos los botones que agregan un producto al carrito de la compra.
let botonesAgregar = document.querySelectorAll(".producto-agregar")
// Varible que almacena el valor del "numerito", campo de la web que muestra el número de productos que hay en el carrito.
let numerito = document.getElementById("numerito")


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

    actualizarListaDeBotonesAgregar();
}

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

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        console.log("ID del botón seleccionado: " + evento.currentTarget.id)
    })
})

function actualizarListaDeBotonesAgregar()
{
    // Actualizamos el array de botones presentes en el main en cada momento.
    botonesAgregar = document.querySelectorAll(".producto-agregar")
    
    // Agregamos un eventListener, que se gestionará a través de la función "agregarAlCarrito".
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

// Array que almacena los productos que están en el carrito de la compra.
let productosEnCarrito
// En caso de que lo haya, sacamos su valor inicial de la memoria de almacenamiento del navegador.
const productosEnCarritoLocalStorage = JSON.parse(localStorage.getItem("carritoTiendaRopa"))

if (productosEnCarritoLocalStorage)
{
    productosEnCarrito = productosEnCarritoLocalStorage
    actualizarNumerito()
}
else
{
    productosEnCarrito = []
}

// Función que agrega el producto seleccionado al array que gestiona el carrito de la compra.
function agregarAlCarrito(evento)
{
    const idProducto = evento.currentTarget.id

    const datosProductoAgregado = productos.find(producto => producto.id == idProducto)

    // Si el producto no está ya en el carrito, lo agregamos sin más. 
    // (el método "some" devuelve true/false en función de si hay al menos algún producto en 
    // en array que cumpla la condición establecida).
    if (!productosEnCarrito.some(producto => producto.id == idProducto))
    {
        // Creamos el campo "cantidad", que se añade al resto de los presentes en el producto.
        datosProductoAgregado.cantidad = 1
        productosEnCarrito.push(datosProductoAgregado)
    }
    else
    {
        // Localizamos la posición del producto dentro del carrito de la compra.
        const posicion = productosEnCarrito.findIndex(producto => producto.id == idProducto)
        // Aumentamos la cantidad de ese producto en 1 unidad.
        productosEnCarrito[posicion].cantidad++
    }
    
    actualizarNumerito()

    // Guardamos el carrito en localStorage del navegador para que pueda ser leído desde carrito.html
    // Con "JSON.stringify" convertimos el array "productosEnCarrito" en un objeto JSON.
    localStorage.setItem("carritoTiendaRopa", JSON.stringify(productosEnCarrito))

    // A partir de este momento, toda la información relativa al carrito debe obtenerse del localStorage,
    // pues es donde tendremos una versión actualizada y centralizada de lo que hay en el carrito.
}

function actualizarNumerito()
{
    // La función "reduce" ejecuta una función reductora sobre cada elemento de un array, devolviendo como
    // resultado un único valor. Recibe dos parámetros, "acumulador" y "producto", de tal forma que en cada
    // iteración se suma a "acumulador" el valor de "producto.cantidad", devolviendo al recorrer todo el 
    // array el valor de "acumulador". El "0" del final indica el valor de partida de "acumulador".
    let cantidad = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    
    numerito.innerText = cantidad
}