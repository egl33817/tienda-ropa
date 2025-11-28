// En este archivo se van a gestionar el aside, "open-menu" y "close-menu".
const openMenu = document.querySelector(".open-menu")
const closeMenu = document.querySelector(".close-menu")
const aside = document.querySelector("aside")

// Añadimos eventos al botón que mostrará y ocultará el menú, según sea el caso.
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible")
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible")
})

// También queremos que cuando se haga clic en uno de los botones del menú, este se
// cierre automáticamente. Los botones tienen la clase "boton-menu" para identificarse.
// Tenemos acceso a "botonesCategorias" porque antes de este fichero se ha ejecutado el 
// contenido de "main.js".
botonesCategorias.forEach(boton => 
    boton.addEventListener("click", () => 
        aside.classList.remove("aside-visible")
    )
)