/* todo:


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

// 處理函式
// html 模組化
function html(todo) {
  const date = todo.time ? todo.time.split("T")[0] : "";
  const time = todo.time ? todo.time.split("T")[1] : "";
  const completedStyle = todo.completed ? "text-decoration: line-through;" : "";

  return `<li>
            <div>
            <input type="checkbox" data-id="${todo.id}" ${
    todo.completed ? "checked" : ""
  }> 
              <span class="todo-date" style="${completedStyle}">${date}</span>
              <span class="todo-time" style="${completedStyle}">${time}</span>
            </div>
            <div>
            <span class="todo-text" style="${completedStyle}">${
    todo.text
  }</span>
              <i class="fa-regular fa-circle-xmark" style="color: #b8795a;"></i>
            </div>
          </li>`;
}

// 將事項顯示在頁面上
const displayTodo = () => {
  const displayItem = todos.map(html).join("");
  display.innerHTML = `<ul>${displayItem}</ul>`;
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
};

// 更新 todo 的 completed 属性和显示效果
const todoCompleted = (id, completed) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = completed;
    displayTodo();
  }
};
//  ==========

// 事件
addBtn.addEventListener("click", () => {
  addTodoObj();
});

display.addEventListener("change", (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    const id = parseInt(event.target.dataset.id);
    const completed = event.target.checked;
    todoCompleted(id, completed);
  }
});
