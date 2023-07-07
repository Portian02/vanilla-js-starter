import { post, getList, deleTe, upDateTasks } from "./request.js";

////////////////////Variables globales///////////////////////

var contador = document.querySelector("#contador");

////////////////////Variables globales///////////////////////


/////////////////////////////////////////////FUNCIÓN VALIDAR DATOS////////////////////////////////////////////////////////////////////////////////////
function ValidarDatos(datos) {
  let listado = document.querySelector("ul");
  let li = listado.getElementsByTagName("li");

  for (let e = 0; e < li.length; e++) {
    if (li[e].innerText === datos) {
      return false;
    }
  }
  return true;
}
//////////////////////////////////Funcion Validar Mayusculas///////////////////////////////////////////////////////////////////////////////////////
function esMayuscula() {
  let listado = document.querySelector("ul");
  let campo = document.querySelector(".camp");
  let datos = campo.value;
  let elementos = listado.getElementsByTagName("li");

  for (let e = 0; e < elementos.length; e++) {
    if (elementos[e].textContent.toUpperCase() == datos.toUpperCase()) {
      return false;
    }
  }
  return true;
}
///////////////////////////////////////////////// FUNCIÓN BOTÓN AGREGAR//////////////////////////////////////////////////////////////////////////////////
async function Add(e) {
  let campo = document.querySelector(".camp");

  e.preventDefault();
  let text = campo.value;
  if (esMayuscula(text)) {
    if (ValidarDatos(text)) {
      if (text !== "" && text.trim()) {
        let tasks = { task: text, checked: false };
        let posted = await post(tasks);

        makeTasks(posted.id, posted.task, posted.checked);
      } else {
        Swal.fire({
          title: "No hay texto",
          text: "Por favor ingrese texto",
          imageUrl:
            "https://media.tenor.com/0ygiqFaX-ssAAAAM/bongo-cat-typing.gif",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    }
  } else {
    Swal.fire({
      title: "Ya existe",
      text: "Por favor ingresa una nueva",
      imageUrl:
        "https://media.tenor.com/Z2huUOjTDoYAAAAM/uncomfortable-awkward.gif",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Custom image",
    });

    campo.value = "";
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
      Swal.fire({
        title: "Completado",
        text: "tarea completada",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
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
