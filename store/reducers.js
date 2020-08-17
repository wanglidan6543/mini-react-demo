import { combineReducers } from 'redux';

const { COUNTER_ADD, SHOPCART_ADD } = require('./actionType');

function counterAdd(preState = {}, action) {
  switch (action.type) {
    case COUNTER_ADD: {
      let newState = { ...preState, total: preState.total + action.num };
      return newState
    }
    default:
      return preState;
  }
}

function addToShopCart(preState = {}, action) {
  switch (action.type) {
    case SHOPCART_ADD: {
      let newState = {
        ...preState,
        list: [...preState.list, action.data],
        total: preState.total+1
      }
      return newState
    }
    default: 
      return preState
  }
}

export const reducers = combineReducers({
  counter: counterAdd,
  shopData: addToShopCart
})
