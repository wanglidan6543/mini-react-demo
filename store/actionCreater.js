const { COUNTER_ADD, SHOPCART_ADD } = require('./actionType');

function counterAddAction(num) {
  return {
    type: COUNTER_ADD,
    num
  }
}

function addToCartAction(pId) {
  return {
    type: SHOPCART_ADD,
    data: {id: pId}
  }
}

module.exports = {
  counterAddAction,
  addToCartAction
}