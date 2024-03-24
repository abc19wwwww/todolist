/* todo:
1. 根據不同的頁籤顯示相對的總筆數
 ========== */

// 獲取元素
/**
 * @type HTMLInputElement
 */
const input = document.querySelector("#todo");
/**
 * @type HTMLInputElement
 */
const time = document.querySelector("#time");
const addBtn = document.querySelector("#add");
const display = document.querySelector("#display");
//  ==========

let todos = [];
let active = "all";

// 處理函式
// 將事項存入 localStorage
function storage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// html 模組化
function html(v) {
  const date = v.time ? v.time.split("T")[0] : "";
  const time = v.time ? v.time.split("T")[1] : "";
  const completedStyle = v.completed ? "text-decoration: line-through;" : "";

  return `<li>
            <div class="li-left">
            <input type="checkbox" data-id="${v.id}" ${
    v.completed ? "checked" : ""
  }> 
              <span class="todo-date" style="${completedStyle}">${date}</span>
              <span class="todo-time" style="${completedStyle}">${time}</span>
            </div>
            <div class="li-rigth">
            <span class="todo-text" data-id="${
              v.id
            }" style="${completedStyle}">${v.text}</span>
              <i class="fa-regular fa-circle-xmark" data-id="${
                v.id
              }" style="color: #b8795a;"></i>
            </div>
          </li>`;
}

// 將事項顯示在頁面上
const displayTodo = () => {
  const displayItem = todos.map(html).join("");
  display.innerHTML = `<ul>${displayItem}</ul>`;
  total();
};

// 將輸入的事項加入到陣列中變成物件
const addTodoObj = () => {
  const todosItem = {
    id: +new Date(),
    text: input.value,
    time: time.value,
    completed: false,
  };

  todos.unshift(todosItem);
  displayTodo();
  input.value = "";
  time.value = "";
  storage();
};

// 更新 completed
const todoCompleted = (id, completed) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = completed;
    displayTodo();
    storage();
  }
};

// 刪除
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodo();
  storage();
};

// 總筆數
const total = () => {
  let count;
  const totalObj = document.querySelector("#total");

  if (active === "all") {
    count = todos.length;
  } else {
    const isCompleted = active === "completed";
    count = todos.filter((todo) => todo.completed === isCompleted).length;
  }

  totalObj.textContent = `共${count}筆`;
};

// 切換頁籤時的過濾 顯示到頁面上
const displayActive = () => {
  let filter;
  if (active === "all") {
    filter = todos;
  } else if (active === "completed") {
    filter = todos.filter((todo) => todo.completed);
  } else {
    filter = todos.filter((todo) => !todo.completed);
  }

  const displayItem = filter.map(html).join("");
  display.innerHTML = `<ul>${displayItem}</ul>`;
  total();
};

// 切換頁籤樣式
const updateActiveTab = () => {
  document.querySelectorAll(".tab").forEach((tab) => {
    if (tab.dataset.filter === active) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
};

//  ==========

// 事件監聽
// 按下加號按鈕時
addBtn.addEventListener("click", () => {
  if (input.value === "") {
    return;
  }
  addTodoObj();
});

// 按下 enter 時
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodoObj();
  }
});

// checkbox 改變時
display.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    const id = parseInt(e.target.dataset.id);
    const completed = e.target.checked;
    todoCompleted(id, completed);
  }
});

// 按下叉叉按鈕時
display.addEventListener("click", (e) => {
  if (e.target.matches(".fa-circle-xmark")) {
    const id = parseInt(e.target.dataset.id);
    deleteTodo(id);
  }
});

// 雙點擊進行編輯
display.addEventListener("dblclick", (e) => {
  if (e.target.matches(".todo-text")) {
    const id = parseInt(e.target.dataset.id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo.completed) {
      return;
    }

    const text = e.target.innerText;
    const input = document.createElement("input");
    input.type = "text";
    input.value = text;
    input.classList.add("todo-edit");

    e.target.replaceWith(input);
    input.focus();

    const saveEdit = () => {
      const newText = input.value;
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        todos[todoIndex].text = newText;
        displayTodo();
      }
    };

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });
  }
});

// 切換頁籤
document.querySelector(".status").addEventListener("click", (e) => {
  if (e.target.matches(".tab")) {
    active = e.target.dataset.filter;
    displayActive();
    updateActiveTab();
  }
});

// 讀取 localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    todos = storedTodos;
    displayTodo();
  }
});
