import * as t from './actionTypes.js';
import createReducer from 'shared/utils/createReducer';

/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
const matchAny = function (haystack, arr) {
  return arr.some(function (v) {
    return haystack.indexOf(v) >= 0;
  });
};

export default createReducer({}, {
  [t.GET_USER_INFO]: (state, action) => {
    const data = action.data;
    const userInfo = {
      fullName: data.name
    };
    return userInfo;
  }
});
