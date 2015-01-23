'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var routes = require('./routes');
var Html   = require('./components/Html');

module.exports = function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {

    var title  = DocumentTitle.rewind();
    var markup = React.renderToString(<Handler params={state.params} query={state.query}/>);
    var html   = React.renderToStaticMarkup(<Html title={title} markup={markup} />);

    res.send('<!DOCTYPE html>' + html);
  });
};

