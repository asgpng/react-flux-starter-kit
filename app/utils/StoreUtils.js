'use strict';

// based on https://github.com/gaearon/flux-react-router-example

var _ = require('lodash'),
  EventEmitter = require('events').EventEmitter,
  assign = require('object-assign'),
  CHANGE_EVENT = 'change';

var StoreUtils = {
  createStore: function(spec) {
    var store = assign({
      emitChange: function() {
        this.emit(CHANGE_EVENT);
      },

      addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
      },

      removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
      }
    }, spec, EventEmitter.prototype);

    _.each(store, function (val, key) {
      if (_.isFunction(val)) {
        store[key] = store[key].bind(store);
      }
    });

    store.setMaxListeners(0);
    return store;
  },

  isInBag: function(bag, id) {
    if (!bag[id]) {
      return false;
    }
  },

  mergeIntoBag: function(bag, key, value) {
    if (!bag[key]) {
      bag[key] = value;
    }
  },

  mergeIntoSubArray: function(bag, key, value) {
    if (bag[key] && bag[key] instanceof Array && bag[key].indexOf(value) === -1) {
      bag[key].push(value);
    }
    else {
      bag[key] = [value];
    }
  }
};

module.exports = StoreUtils;
