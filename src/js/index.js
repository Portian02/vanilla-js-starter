//VARIABLES
let btnAdd = document.querySelector(".btnAgregar");

// FUNCIÓN BOTÓN AGREGAR
import { Add, loadTasks } from "./modules.js";

btnAdd.addEventListener("click", Add);

document.addEventListener("DOMContentLoaded", loadTasks);
