import { isPromise } from '../utils/common';

/**
 * This is an async action handling middleware.
 * It cooperates with promise-action to control async flow.
 *
 * It intercepts promise object with `types` field.
 * The `type` field is supposed to be array of 3 action types elements. In sequence, the 3 elements
 * should represents pending, done and fail of given promise.
 *
 * The promise object structure is like below:
 * ```
 *  {
 *    then: <func>
 *    fail: <func>
 *    types: [pending, done, fail]
 *  }
 * ```
 */
export default function promiseMiddleware() {
  return (next) => (action) => {
    // If action is not promise we expected, just ignore it.
    if (!isPromise(action)) {
      // console.log('ignore not promise');
      return next(action);
    }

    if (!(action.types && action.types.length === 3)) {
      // do nothing, wait for the promise to handle itself.
      return null;
    }

    // if the promise action has `types`, means it want this middleware to dispatch
    // pending, done, fail actions for it.

    const { types, ...rest } = action;

    // promise creator decides the actual naming of pending, done an fail.
    const [PENDING, DONE, FAIL] = types;

    // trigger pending immediately
    next({ ...rest, type: PENDING });

    return action.then(
      (result) => next({ ...rest, result, type: DONE }),
      (error) => next({ ...rest, error, type: FAIL })
    );
  };
}

