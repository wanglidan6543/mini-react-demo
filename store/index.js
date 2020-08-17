import { createStore } from 'redux';
import { reducers } from './reducers';

let initState = {
  counter: {
    total: 0
  },
  shopData: {
    list: [],
    total: 0
  }
}

const store = createStore(reducers, initState);

export default store;