import store from '../../store/index';
import { storeBindingsBehavior } from '../../store/storeBinding';
const { counterAddAction } = require('../../store/actionCreater');

Component({
  data: {
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      counter: (state) => state.counter,
    }
  },
  attached() {
  },

  methods: {
    buttonTap() {
      const action = counterAddAction(1)
      store.dispatch(action);
    }
  },
})
