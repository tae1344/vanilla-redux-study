import { createStore } from "redux";

const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

// 리듀서 --> 앱의 데이터를 수정하고 변경해 새로운 값을 리턴하는 '함수'다.
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier); // 앱의 데이터를 저장하는 역할

// subscribe에 listener로 전달할 함수
const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange); // store 안의 상태 변화를 구독(감지)한다.

plus.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

// *******************************************************************************
// ---------------------------  To Do List Example -------------------------------

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const initId = 0;

// action type
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// action creator
const addTodo = (text) => {
  return { type: ADD_TODO, text };
};
const deleteTodo = (id) => {
  return { type: DELETE_TODO, id };
};

// reducer
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      let id = state.length === 0 ? initId : Math.max(...state.map((todo) => todo.id)) + 1;
      return [...state, { id, text: action.text }];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

// store
const todoStore = createStore(todoReducer);

// list 보이기
const paintTodos = () => {
  const toDos = todoStore.getState();
  console.log(toDos);
  ul.innerHTML = "";

  toDos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);

    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// 새 todo 제출
const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
};

const dispatchAddTodo = (text) => {
  todoStore.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
};

// store에 변화가 발생할 때마다 인자로 준 콜백함수 실행
todoStore.subscribe(paintTodos);

form.addEventListener("submit", onSubmit);
