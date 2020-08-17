import store from '../../store/index';
const { counterAddAction, addToCartAction } = require('../../store/actionCreater');

Page({
  data: {
  },
  onLoad() {
    this.setData({
      counter: store.getState().counter
    })
    store.subscribe(this.handleStoreChanged.bind(this));
  },

  handleStoreChanged() {
    let newState = store.getState();
    this.setData({
      counter: newState.counter
    })
  },

  update() {
    const action = counterAddAction(1)
    store.dispatch(action);
  },

  addToShopCart() {
    let len = store.getState().shopData.list.length;
    const action = addToCartAction(len+1)
    store.dispatch(action)
  }
})
