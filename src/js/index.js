//VARIABLES
let btnAdd = document.querySelector(".btnAgregar");

// FUNCIÓN BOTÓN AGREGAR
import { Add, tareas } from "./modules.js";
console.log(tareas);
btnAdd.addEventListener("click", Add);
