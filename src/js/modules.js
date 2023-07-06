import { post, getList, deleTe, upDateTasks } from "./request.js";

////////////////////Variables globales///////////////////////

var contador = document.querySelector("#contador");

////////////////////Variables globales///////////////////////

///////////////////////////////////////////////// FUNCIÓN BOTÓN AGREGAR//////////////////////////////////////////////////////////////////////////////////
async function Add(e) {
  let campo = document.querySelector(".camp");

  e.preventDefault();
  let text = campo.value;

  if (text !== "" && text.trim()) {
    let tasks = { task: text, checked: false };
    let posted = await post(tasks);

    makeTasks(posted.id, posted.task, posted.checked);
  } else {
    window.alert("ingrese texto");
  }
}

/////////////////////////////////////////////////FUNCIÓN CREAR TAREAS///////////////////////////////////////////////////////////////////////////////
function makeTasks(id, texto, checked) {
  let campo = document.querySelector(".camp");
  let vacio = document.querySelector(".vacio");
  let listado = document.querySelector("ul");
  const li = document.createElement("li");
  li.className = "tareas";
  campo.value = "";
  const p = document.createElement("p");
  li.id = id;
  p.textContent = texto;

  listado.appendChild(li);
  li.appendChild(checkbox(checked));
  li.appendChild(p);
  li.appendChild(Delete());
  vacio.style.display = "none";
}

////////////////////////////////////////////////FUNCTION LOAD TASK//////////////////////////////////////////////////////////////////////////////////
async function loadTasks() {
  let tareas = await getList();
  var contadorCarga = 0;
  tareas.forEach((tarea) => {
    makeTasks(tarea.id, tarea.task, tarea.checked);
  });

  for (let index = 0; index < tareas.length; index++) {
    if (tareas[index].checked == true) {
      contadorCarga++;
    }
  }

  contador.innerHTML = contadorCarga;

}

////////////////////////////////////////////// FUNCIÓN DEL CHECKBOX/////////////////////////////////////////////////////////////////////////////////
function checkbox(checked) {
  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.checked = checked;
  check.className = "Checkbox";

  check.addEventListener("change", async function (e) {
    let item = e.target.parentElement;

    if (check.checked) {
      let cuenta = parseInt(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
    } else {
      let cuenta = parseInt(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    }
    upDateTasks(item.id, { checked: check.checked });
  });
  return check;
}

////////////////////////////////////////////// FUNCTION DELETE/////////////////////////////////////////////////////////////////////////////////
function Delete() {
  let listado = document.querySelector("ul");
  let vacio = document.querySelector(".vacio");
  let btndelete = document.createElement("i");
  let contador = document.querySelector("#contador");
  btndelete.className = "fa-sharp fa-solid fa-trash fa-bounce";

  btndelete.addEventListener("click", (e) => {
    let item = e.target.parentElement;
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

////////////////////////////////////////////// EXPORTS FUNCTIONS/////////////////////////////////////////////////////////////////////////////////
export { Add, loadTasks };
