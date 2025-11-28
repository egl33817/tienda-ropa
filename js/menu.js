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