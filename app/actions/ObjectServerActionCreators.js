'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ObjectServerActionCreators = {

  handleObjectSuccess: function(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_OBJECT_SUCCESS,
      response: response
    });
  },

  handleObjectError: function(err) {
    console.log(err);
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_OBJECT_ERROR
    });
  }

};

module.exports = ObjectServerActionCreators;
