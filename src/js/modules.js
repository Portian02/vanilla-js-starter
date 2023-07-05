import { post, getList, deleTe } from "./request.js";

///////////////////////////////////////////////// FUNCIÓN BOTÓN AGREGAR//////////////////////////////////////////////////////////////////////////////////
async function Add(e) {
  let campo = document.querySelector(".camp");
  let vacio = document.querySelector(".vacio");
  e.preventDefault();

  let text = campo.value;

  if (text !== "" && text.trim() ) {
    let tasks = { task: text, checked: false };
    let posted = await post(tasks);

    vacio.style.display = "none";
    makeTasks(posted.id, posted.task);
    campo.value = "";

    vacio.style.display = "none";
  } else {
    window.alert("ingrese texto");
  }
}
///////////////////////////////////////////////// FUNCIÓN BOTÓN AGREGAR//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////FUNCIÓN CREAR TAREAS///////////////////////////////////////////////////////////////////////////////
function makeTasks(id, texto) {
  let listado = document.querySelector("ul");
  const li = document.createElement("li");
  li.className = "tareas";
  const p = document.createElement("p");
  li.id = id;
  p.textContent = texto;

  listado.appendChild(li);
  li.appendChild(checkbox());
  li.appendChild(p);
  li.appendChild(Delete());
}
/////////////////////////////////////////////////FUNCIÓN CREAR TAREAS///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////FUNCTION LOAD TASK//////////////////////////////////////////////////////////////////////////////////
async function loadTasks() {
  let tareas = await getList();
  tareas.forEach((tarea) => {
    makeTasks(tarea.id, tarea.task);
  });
}
////////////////////////////////////////////////FUNCTION LOAD TASK//////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// FUNCIÓN DEL CHECKBOX/////////////////////////////////////////////////////////////////////////////////
function checkbox() {
  let contador = document.querySelector("#contador");

  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.checked = false;
  check.className = "Checkbox";

  check.addEventListener("click", function () {
    if (check.checked) {
      let cuenta = parseInt(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
    } else {
      let cuenta = parseInt(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    }
  });

  return check;
}
////////////////////////////////////////////// FUNCIÓN DEL CHECKBOX/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// FUNCTION DELETE/////////////////////////////////////////////////////////////////////////////////
function Delete() {
  let listado = document.querySelector("ul");
  let vacio = document.querySelector(".vacio");
  let btndelete = document.createElement("i");
  let contador = document.querySelector("#contador");
  btndelete.className = "fa-sharp fa-solid fa-trash fa-bounce";

  btndelete.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    let check = item.querySelector("input");

    if (check.checked) {
      let resta = parseInt(contador.textContent);

      resta = resta - 1;
      contador.textContent = resta;
    }

    listado.removeChild(item);
    deleTe(item.id);

    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      vacio.style.display = "block";
    } else {
      vacio.style.display = "none";
    }
  });

  return btndelete;
}
////////////////////////////////////////////// FUNCTION DELETE/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// EXPORTS FUNCTIONS/////////////////////////////////////////////////////////////////////////////////
export { Add, loadTasks };
////////////////////////////////////////////// EXPORTS FUNCTIONS/////////////////////////////////////////////////////////////////////////////////
