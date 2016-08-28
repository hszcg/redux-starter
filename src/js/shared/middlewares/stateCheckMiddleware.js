'use strict';

/**
 * This middleware is for better development experience.
 *
 * If developer forgets to register component, there is no chance to get component work in H3O
 * even all component functionality is completed. It may takes hours to figure out the reason.
 *
 * This middleware logs warnings if there is no state update after dispatching an action. In this
 * situation, it is highly possible because component is forgotten to be registered.
 */

import Logger from '$shared/lib/logger';

module.exports = function ({ getState }) {
  return next => action => {
    const originalState = getState();
    next(action);
    const newState = getState();

    if (originalState === newState) {
      Logger.warn(`
        There is no state update for dispatching action ${action.type}.
        It is highly possible that you forgot to register some component to Redux.`);
    }
  };
};
