import { post, getList, deleTe } from "./request.js";

// FUNCIÓN BOTÓN AGREGAR

 async function Add(e) {
  e.preventDefault();

  let listado = document.querySelector("ul");
  let campo = document.querySelector(".camp");
  let text = campo.value;
  let vacio = document.querySelector(".vacio");

  if (text !== "" && text.trim()) {
    const li = document.createElement("li");
    li.className = "tareas";
    const p = document.createElement("p");
    p.textContent = text;
    post(text);

    p.className = "parra";
    listado.appendChild(li);
    li.id = postedtask.id
    li.appendChild(checkbox());
    li.appendChild(p);
    li.appendChild(Delete());
    vacio.style.display = "none";
    campo.value = "";

    vacio.style.display = "none";
  } else {
    window.alert("ingrese texto");
  }
}

// FUNCIÓN DEL CHECKBOX
function checkbox() {
  let contador = document.querySelector("#contador");

  let check = document.createElement("input");
  check.setAttribute("type", "checkbox");
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
// FUNCIÓN ELIMINAR TAREAS
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
    deleTe(postedtask.id);
   
    const items = document.querySelectorAll("li");
    if (items.length === 0) {
      vacio.style.display = "block";
    } else {
      vacio.style.display = "none";
    }
  });

  return btndelete;
}
let tareas = getList();
//EXPORT FUNCTIONS
export { Add, tareas };
