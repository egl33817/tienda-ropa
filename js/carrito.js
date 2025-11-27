// En primer lugar, recuperamos la información disponible en localStorage
// para saber si tenemos algo o no en el carrito.
const productosEnCarrito = JSON.parse(localStorage.getItem("carritoTiendaRopa"))
console.log(productosEnCarrito)

// Elementos del DOM.
const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.getElementById("carrito-comprado")

// Si hay productos en el carrito, los mostramos en pantalla ocultando aquellos
// elementos HTML que no interese mostrar.
if (productosEnCarrito)
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

}