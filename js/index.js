// get element
const input = document.querySelector("input");
const button = document.querySelector("#button");
const display = document.querySelector(".display");
// console.log(display);

const todo = []; // 等會將加入的代辦放進陣列裡變成物件

// add event
button.addEventListener("click", () => {
  const inputVal = input.value;
  input.value = ""; // 送出後清空輸入框
  if (inputVal) {
    const item = { id: new Date(), text: inputVal, completed: false };
  }
});

// fun
