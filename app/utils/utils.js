var utils = {

  // from http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
  splitArray: function(a, n) {
    var len = a.length, out = [], i = 0;
    while (i < len) {
      var size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
    return out;
  },

  cloneObject: function(object) {
    if (object) {
      return JSON.parse(JSON.stringify(object));
    }
    return undefined;
  },

  removeValueFromArray: function(value, array) {
    var index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}

module.exports = utils;
