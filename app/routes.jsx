'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('./components/App.jsx');
var HomePage = require('./pages/HomePage.jsx');

module.exports = (
  <Route name='root' path='/' handler={App}>
    <DefaultRoute handler={HomePage} />
  </Route>
);
