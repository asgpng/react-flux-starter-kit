var when = require('when');

var _promisesByID = {};

var CoreAPI = {

  // get a single object by id
  get: function(id) {
    if (!_promisesByID[id]) {
      _promisesByID[id] = when.promise(function(resolve, reject) {
        // insert something here
      });
    }
    return _promisesByID[id];
  }
};

module.exports = CoreAPI;
