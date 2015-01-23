'use strict';

var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var StoreUtils = require('../utils/StoreUtils');

var utils = require('../utils/utils');

var createStore = StoreUtils.createStore;
var isInBag = StoreUtils.isInBag;
var mergeIntoBag = StoreUtils.mergeIntoBag;

var _storedObjects = {};

var ArticleStore = createStore({

  contains: function(id) {
    return (isInBag(_storedObjects, id));
  },

  get: function(id) {
    return _storedObjects[id];
  },

  getAll: function() {
    return Object.keys(_storedObjects).map(function(id) {
      return _storedObjects[id];
    });
  }
});

ArticleStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.REQUEST_OBJECT_SUCCESS:
      mergeIntoBag(_storedObjects, action.response.id, action.response);
      ArticleStore.emitChange();
      break;

     default:
    // do nothing
  }
})

module.exports = ArticleStore;
