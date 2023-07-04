const server = "http://localhost:3000/api/task";
const resquest = (method = "GET", task) => ({
  method: method,
  mode: "cors",
  cahce: "no-cache",
  Credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify(task),
});

// FUNCTION GET
async function getList() {
  const response = await fetch("http://localhost:3000/api/task");
  const list = await response.json();
  console.log(list);
  return list;
}

// FUNCTION POST
function post(text) {
  fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ task: text }),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)));
}
// FUNCTION DELETE TASK FROM THE SERVER


function deleTe() {
      fetch("http://localhost:3000/api/task/<task_id>", {
            method: "DELETE",
          })
            .then((response) => {
                  "success: task  deleted";
                })
                .catch((error) => {
                      "couldn´t delete the task";
                    });
                }

  export { post, getList, deleTe };
  
  

  
  
  
  
                  
                  
                  
                  // function deleTe(text) {
                  //     fetch("http://localhost:3000/api/task", {
                  //       method: "DELETE",
                  //       headers: {
                  //         Accept: "application/json",
                  //         "Content-Type": "application/json",
                  //       },
                  //       body: JSON.stringify({ id: text }),
                  //       body: JSON.stringify({ task: text }),
                  //     })
                  //       .then((response) => response.json())
                  //       .then((response) => console.log(JSON.stringify(response)));
                  //   }