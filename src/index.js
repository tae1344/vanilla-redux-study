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
