import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { combine } from 'shared/utils/reducer';

import routes from 'shared/config/routers.js';
import configureStore from 'shared/utils/configureStore.js';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');

/**
 * initial render.
 *
 * @param store {Object} redux store
 * @param history {Object} react-redux history
 */
function renderFunc(store, history) {
  /**
   * Wrap Provider around Router or RouterContext. Not opposite, since RouterContext doesn't relay
   * operation on props.children.
   *
   * Reference: https://github.com/reactjs/react-router/blob/v2.0.1/modules/RouterContext.js#L62-L109
   */
  ReactDOM.render((
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
    ), window.document.getElementById('index'));
}

/**
 * init client.
 *
 * @param components {Array} array of all components used in this client.
 * @param render {Function} function to render client root component.
 */
function init(components, render) {
  const componentReducers = combine(components);
  const store = window.store = configureStore({
    ...{},
    browser: {
      width: document.body.offsetWidth
    }
  }, componentReducers);

  // This enhanced history can sync navigation with the store
  const history = syncHistoryWithStore(browserHistory, store);

  render(store, history);
}

import allComponents from 'components';

init(allComponents, renderFunc);
