'use strict';

/**
 * Returns endpoint for both client side and server side.
 *
 * @endpointName specific name of endpoint. e.g. 'mozart'
 */
export function getEndpoint (endpointName) {
  let config;

  if (global.window) {
    // in browser side, endpoints are in state.
    const state = window.store.getState();
    config = state.common.endpoints;
  } else {
    // in server side, endpoints are in letiables.
    config = backendEndpoints;
  }

  return config[endpointName];
}

let backendEndpoints = {};
export function setBackendEndpoints(endpoints) {
  backendEndpoints = endpoints;
}

/**
 * get the attribute or getter function value of an object in a chain<br/>
 * eg. getObjChain(video, 'show.company', name) will get video.show.company].name<br/>
 * eg. getObjChain(video, '', name) will get video.name
 * @param {object} obj get data from given object
 * @param {array} path key chain
 */
export function getValueInChain(obj, path) {
  if(obj === null) {
    return null;
  }
  let target = obj;
  for(let i=0; i<path.length; i++) {
    const attr = path[i];
    if((typeof target[attr]) === 'function') {
      target = target[attr]();
    } else if(target.hasOwnProperty(attr)) {
      target = target[attr];
    }
    // the attr is missing, something is wrong
    else {
      target = null;
    }
    if(target === null) {
      break;
    }
  }
  return target;
}

/**
 * helper function to check whether given object is a promise instance.
 */
export const isPromise = (value) => {
  return  (typeof value === 'object') && (typeof value.then === 'function');
};

/**
 * Creates a deffered object just like jQuery.Deffered.
 *
 */
export const Deferred = () => {
  let _resolve, _reject;

  // ES6 promise spec requires constructor to have an resolver function argument which
  // is supposed to trigger resolve & reject. However, it is impossible to know how to
  // trigger them in generic case. So, we just record resolve & reject into local letiable
  // and assign it back to promise object. Caller of this function should know when to call
  // resolve and reject.
  //
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  promise.resolve = _resolve;
  promise.reject = _reject;

  return promise;
};

