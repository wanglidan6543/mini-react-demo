
function _storeStateToDataFields(target, options) {
  var store = options.store;
  var fields = options.fields;

  var pendingSetData = {};
  let storeState = store.getState();

  // 处理属性fields
  if (fields && (typeof fields === 'object')) {
    Object.keys(fields).map((field, index) => {
      let def = fields[field];
      let value = '';
      if (typeof def === 'function') {
        value = def.call(target, storeState);
      } else {
        value = storeState[def];
      }
      pendingSetData[field] = value;
    });

    target.pendingSetData = pendingSetData;
    target.setData(pendingSetData);
  }
}

function _updateData(target, store) {
  let storeState = store.getState();
  let pendingSetData = target.pendingSetData;

  Object.keys(pendingSetData).map(key => {
    pendingSetData[key] = storeState[key];
  })

  target.setData(pendingSetData);
}

export const storeBindingsBehavior = Behavior({
  definitionFilter: function definitionFilter(defFields) {
    if (!defFields.methods) {
      defFields.methods = {};
    }
    var storeBindings = defFields.storeBindings;
    defFields.methods._reduxMiniprogramBindings = function () {
      return storeBindings;
    };
  },
  attached: function attached() {
    if (typeof this._reduxMiniprogramBindings !== 'function') return;
    var storeBindings = this._reduxMiniprogramBindings();

    if (!storeBindings) {
      this._reduxMiniprogramBindings = null;
      return;
    }
    const store = storeBindings.store;
    if (!store) { return; }
    _storeStateToDataFields(this, storeBindings);

    this.unsubscribe = store.subscribe(() => {
      _updateData(this, store);
    })
  },
  detached: function detached() {
    this.unsubscribe();
  },

  methods: {
  }
});