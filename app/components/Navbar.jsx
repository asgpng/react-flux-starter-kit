'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var navbarInstance = React.createClass({

  render: function() {
    return (
      <div className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">App Name</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="#">Item</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = navbarInstance;
