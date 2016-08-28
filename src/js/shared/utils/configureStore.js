import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'shared/middlewares/promiseMiddleware';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';

import { install, combineReducers as loopCombineReducers } from 'redux-loop';

const immut = require('redux-immutable-state-invariant');

export default function configureStore(initialState, reducers) {
  const allReducers = {
    ...reducers,

    // `routing` is reserved in state for routerReducer.
    // No other components or reducer should update `routing`.
    // routerReducer will do work to sync store and navigation.
    routing: routerReducer
  };

  const middlewares = [promiseMiddleware, thunk, createLogger()];

  // The condition is intentionally to check compilation time value so
  // that development-mode-only middleware is not built into bundle.js
  if (process.env.NODE_ENV === 'development') {
    // In development mode, any mutation on Redux state raises an exception to
    // be displayed in web page. This plugin is not applied in production to
    // avoid runtime overhead. All this kind of mutation should be caught during
    // development. Developers should not ignore it.
    //
    middlewares.push(immut());
  }

  const storeEnhancers = compose(
    install(), // the sequence matters, install() must be ahead of applyMiddleware
    applyMiddleware(...middlewares),

    // Below is for React DevTools.
    // Install it from https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
    // TODO: perhaps disable this for production
    (window && window.devToolsExtension) ? window.devToolsExtension() : f => f,
  );

  return createStore(
    // According to //https://github.com/raisemarketplace/redux-loop#use-the-custom-combinereducers-if-you-need-it
    // Only combineReducers from redux-loop is aware that some of reducers might return effects.
    //    combineReducers(allReducers),
    loopCombineReducers(allReducers),

    initialState,
    storeEnhancers
  );
}
