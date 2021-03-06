//reducer函数模块：根据当前的state和指定的action返回一个新的state

//管理count状态数据的reducer

import { combineReducers } from "../lib/redux";
import { INCREMENT, DECREMENT } from "./action_types";

function count(state = 1, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.number;
    case DECREMENT:
      return state - action.number;
    default:
      return state;
  }
}
function user(state={}, action) {
    console.log('user()', state, action)
    switch (action.type) {
      default:
        return state
    }
  }

export default combineReducers({
  count,
  user
});
