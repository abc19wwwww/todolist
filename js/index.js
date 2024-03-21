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
const displayTodo = () => {
  const displayItem = todos.map(
    (v) =>
      `<span class="todo-text">${v.text}</span>
      <span class="todo-time">${v.time}</span>`
  );

  const str = `<input type="checkbox">
  <li>${displayItem}</li>
  <i class="fa-regular fa-circle-xmark" style="color: #b8795a;"></i>`;

  display.innerHTML = `<ul>${str}</ul>`;
};

const addTodoObj = () => {
  const todosItem = {
    id: +new Date(),
    text: input.value,
    time: time.value,
    completed: false,
  };

  todos.unshift(todosItem);
  displayTodo();
};
//  ==========

// 事件
addBtn.addEventListener("click", () => {
  addTodoObj();
});
