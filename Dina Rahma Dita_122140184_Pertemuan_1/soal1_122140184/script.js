document.addEventListener("DOMContentLoaded", function() {
    loadTodos();
});

function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        const text = li.querySelector("span").textContent;
        let status = "default";
        if (li.classList.contains("bg-yellow-300")) status = "ongoing";
        if (li.classList.contains("bg-green-300")) status = "done";
        todos.push({ text, status });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => renderTodo(todo.text, todo.status));
}

function addTodo() {
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (text) {
        renderTodo(text, "default");
        saveTodos();
        input.value = "";
    }
}

function renderTodo(text, status) {
    const list = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-200 p-2 rounded";
    
    if (status === "ongoing") {
        li.classList.add("bg-yellow-300");
    } else if (status === "done") {
        li.classList.add("bg-green-300");
    }

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("flex-1", "cursor-pointer", "text-black");

    const ongoingBtn = document.createElement("button");
    ongoingBtn.textContent = "Ongoing";
    ongoingBtn.className = "bg-yellow-500 text-white px-2 py-1 rounded ml-2 cursor-pointer";
    ongoingBtn.onclick = function () {
        if (li.classList.contains("bg-yellow-300")) {
            li.classList.remove("bg-yellow-300");
            span.classList.add("text-black");
        } else {
            li.classList.add("bg-yellow-300");
            li.classList.remove("bg-green-300");
            span.classList.add("text-black");
        }
        saveTodos();
    };

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Selesai";
    doneBtn.className = "bg-green-500 text-white px-2 py-1 rounded ml-2 cursor-pointer";
    doneBtn.onclick = function () {
        if (li.classList.contains("bg-green-300")) {
            li.classList.remove("bg-green-300");
            span.classList.add("text-black");
        } else {
            li.classList.add("bg-green-300");
            li.classList.remove("bg-yellow-300");
            span.classList.add("text-black"); 
        }
        saveTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded ml-2 cursor-pointer";
    deleteBtn.onclick = function () {
        li.remove();
        saveTodos();
    };

    li.appendChild(span);
    li.appendChild(ongoingBtn);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    list.prepend(li);
}
