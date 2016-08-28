import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home
} from 'pages';

/**
 * This module exports a function to return routes object
 * instead of exporting routes object, because
 * it offers a chance to customize the initialState.
 */
module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
