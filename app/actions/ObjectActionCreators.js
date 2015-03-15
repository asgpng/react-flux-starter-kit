var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var ObjectStore = require('../stores/ObjectStore');
var ObjectAPI = require('../utils/ObjectAPI');

module.exports = {

  get: function(id) {
    if (ObjectStore.contains(id)) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_OBJECT,
      id: id
    });

    ObjectAPI.requestObject(id);
  }

};
