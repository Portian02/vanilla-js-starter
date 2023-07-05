// FUNCTION GET
async function getList() {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "GET",
  });
  const getTask = await response.json();
  return getTask;
}

// FUNCTION POST
async function post(texto) {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(texto),
  });
  const postedTask = await response.json();
  return postedTask;
}

// FUNCTION DELETE TASK FROM THE SERVER
async function deleTe(id) {
  const response = await fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
  });
  const postDeleted = await response.json();
  return postDeleted;
}

export { post, getList, deleTe };
