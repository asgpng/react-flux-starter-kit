'use strict';

var React = require('react');

var Navbar = require('./Navbar.jsx');

var DocumentTitle = require('react-document-title');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  render: function() {
    return (
      <DocumentTitle title='Custom React Starter Kit'>
        <div className='App'>
          <Navbar />
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;
