'use strict';

// from https://github.com/gaearon/flux-react-router-example

function createStoreMixin(stores) {
  var StoreMixin = {
    getInitialState: function() {
      return this.getStateFromStores(this.props);
    },

    componentDidMount: function() {
      var self = this;
      if (stores instanceof Array) {
        stores.forEach(function(store) {
          store.addChangeListener(self.handleStoresChanged);
        });
      }
      else {
        stores.addChangeListener(self.handleStoresChanged);
      }

      this.setState(this.getStateFromStores(this.props));
    },

    componentWillUnmount: function() {
      var self = this;

      if (stores instanceof Array) {
        stores.forEach(function(store) {
          store.removeChangeListener(self.handleStoresChanged);
        });
      }
      else {
        stores.removeChangeListener(self.handleStoresChanged);
      }
    },

    handleStoresChanged: function() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    }
  };

  return StoreMixin;
}

module.exports = createStoreMixin;
