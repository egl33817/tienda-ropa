// En primer lugar, recuperamos la información disponible en localStorage
// para saber si tenemos algo o no en el carrito.
const productosEnCarrito = JSON.parse(localStorage.getItem("carritoTiendaRopa"))
console.log(productosEnCarrito)

// Elementos del DOM.
const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.getElementById("carrito-comprado")

// Botón que vacía el carrito junto con su eventListener.
const botonVaciarCarrito = document.querySelector(".carrito-acciones-vaciar")
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

// Campo con el importe total de la compra.
const contenedorTotal = document.getElementById("total")

// Botón que gestiona la compra del carrito.
const botonComprarCarrito = document.querySelector(".carrito-acciones-comprar")
botonComprarCarrito.addEventListener("click", comprarCarrito)

// Ponemos "let" porque estos botones se están creando después de ejecutar esta sentencia.
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

// Si hay productos en el carrito, los mostramos en pantalla ocultando aquellos
// elementos HTML que no interese mostrar. También hay que ejecutar esta función cada vez
// que se elimina un producto del carrito.
function cargarProductosEnCarrito()
{
    if (productosEnCarrito && productosEnCarrito.length > 0)
    {
        // Mostramos el div que va a contener los productos del carrito.
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        // Y ocultamos los div que no procede mostrar ahora mismo.
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML = ""

        // Recorremos el array que tiene la información de los productos del carrito.
        productosEnCarrito.forEach(producto => {

            const divProducto = document.createElement("div")

            divProducto.classList.add("carrito-producto")

            divProducto.innerHTML = `
                <img class="carrito-producto-imagen" 
                    src="${producto.imagen}" 
                    alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `

            contenedorCarritoProductos.append(divProducto)
        })
    }
    else
    {
        console.log("Carrito vacío")
        // Mostramos el div que muestra el mensaje de carrito vacío.
        contenedorCarritoVacio.classList.remove("disabled")
        // Y ocultamos los div que no procede mostrar ahora mismo.
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }

    actualizarListaBotonesEliminar()

    calcularImporteTotal()
}

cargarProductosEnCarrito()

function actualizarListaBotonesEliminar()
{
    // Actualizamos el array de botones presentes en el main en cada momento.
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    
    // Agregamos un eventListener, que se gestionará a través de la función "eliminarDelCarrito".
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

// Función que elimina un producto del carrito.
function eliminarDelCarrito(evento)
{
    const idProducto = evento.currentTarget.id
    
    // Buscamos el producto en el array productosEnArray y lo eliminamos.
    const indiceProductoAEliminar = productosEnCarrito.findIndex(producto => producto.id == idProducto)
    
    // El método "splice" modifica el array original y elimina elementos a partir del índice que se pasa
    // como primer parámetro, eliminando tantas posiciones como indique el segundo parámetro.
    productosEnCarrito.splice(indiceProductoAEliminar,1)
    
    // Volvemos a cargar los productos en el carrito de la compra.
    cargarProductosEnCarrito()

    // Actualizamos el carrito guardando de nuevo el valor del array "productosEnCarrito" en el localStorage.
    localStorage.setItem("carritoTiendaRopa", JSON.stringify(productosEnCarrito))
}

// Función que vacía el carrito.
function vaciarCarrito()
{
    productosEnCarrito.length = 0

    localStorage.setItem("carritoTiendaRopa", JSON.stringify(productosEnCarrito))

    cargarProductosEnCarrito()
}

// Función que calcula el importe total de la compra.
function calcularImporteTotal()
{
    if (productosEnCarrito.length > 0)
    {
        contenedorTotal.innerText = "$" + productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)
    }
}

// Función que simula que se ha completado una compra.
function comprarCarrito()
{
    productosEnCarrito.length = 0

    localStorage.setItem("carritoTiendaRopa", JSON.stringify(productosEnCarrito))
    console.log("Carrito comprado")
    // Mostramos el div que muestra el mensaje de carrito comprado.
    contenedorCarritoComprado.classList.remove("disabled")
    // Y ocultamos los div que no procede mostrar ahora mismo.
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoVacio.classList.add("disabled")
}