/* todo:
在 li 上 bdclick 可以進行 v.text 文字編輯
1. 在 li 上綁事件
2. 編輯狀態時，要把 span 轉換成 input
3. 按下儲存則相反
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
function html(v) {
  const date = v.time ? v.time.split("T")[0] : "";
  const time = v.time ? v.time.split("T")[1] : "";
  const completedStyle = v.completed ? "text-decoration: line-through;" : "";

  return `<li>
            <div>
            <input type="checkbox" data-id="${v.id}" ${
    v.completed ? "checked" : ""
  }> 
              <span class="todo-date" style="${completedStyle}">${date}</span>
              <span class="todo-time" style="${completedStyle}">${time}</span>
            </div>
            <div>
            <span class="todo-text" style="${completedStyle}">${v.text}</span>
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
};

// 更新 completed
const todoCompleted = (id, completed) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = completed;
    displayTodo();
  }
};

// 刪除
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodo();
};

//  ==========

// 事件監聽
// 按下加號按鈕時
addBtn.addEventListener("click", () => {
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
