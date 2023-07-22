let todos = [];

function addTodo() {
  const todoName = document.getElementById("todoName").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (todoName.trim() === "" || date === "" || time === "") {
    alert("Please enter all required fields.");
    return;
  }

  const todo = {
    name: todoName,
    category: category,
    date: date,
    time: time,
    completed: false,
  };

  todos.push(todo);
  updateTables();
  clearForm();
}

function clearForm() {
  document.getElementById("todoName").value = "";
  document.getElementById("category").value = "personal";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}

function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  updateTables();
}

function editTodo(index) {
  const todo = todos[index];
  document.getElementById("todoName").value = todo.name;
  document.getElementById("category").value = todo.category;
  document.getElementById("date").value = todo.date;
  document.getElementById("time").value = todo.time;
  todos.splice(index, 1);
  updateTables();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  updateTables();
}

function sortTable() {
  const sortType = document.getElementById("sortType").value;
  if (sortType === "date") {
    todos.sort(
      (a, b) =>
        new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time)
    );
  } else if (sortType === "time") {
    todos.sort((a, b) => a.time.localeCompare(b.time));
  }
  updateTables();
}

function updateTables() {
  const uncompletedTableBody = document.getElementById("uncompletedTableBody");
  const completedTableBody = document.getElementById("completedTableBody");

  uncompletedTableBody.innerHTML = "";
  completedTableBody.innerHTML = "";

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleCompleted(index);
    checkboxCell.appendChild(checkbox);

    const nameCell = document.createElement("td");
    nameCell.textContent = todo.name;
    if (todo.completed) {
      nameCell.classList.add("completed");
    }

    const categoryCell = document.createElement("td");
    categoryCell.textContent = todo.category;

    const dateCell = document.createElement("td");
    dateCell.textContent = todo.date;

    const timeCell = document.createElement("td");
    timeCell.textContent = todo.time;

    const editCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary", "btn-sm");
    editButton.onclick = () => editTodo(index);
    editCell.appendChild(editButton);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.onclick = () => deleteTodo(index);
    deleteCell.appendChild(deleteButton);

    row.appendChild(checkboxCell);
    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    row.appendChild(timeCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    if (todo.completed) {
      completedTableBody.appendChild(row);
    } else {
      uncompletedTableBody.appendChild(row);
    }
  });
}
