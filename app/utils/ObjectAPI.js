'use strict';

var ObjectServerActionCreators = require('../actions/ObjectServerActionCreators');
var CoreAPI = require('../utils/CoreAPI');

var ObjectAPI = {

  requestObject: function(id) {
    var self = this;
    CoreAPI.get(id).then(function(response) {
      ObjectServerActionCreators.handleObjectSuccess(response);
    }).catch(function(err) {
      ObjectServerActionCreators.handleObjectError(err);
    });
  }

};

module.exports = ObjectAPI;
