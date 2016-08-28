import createReducer from 'shared/utils/createReducer';
import * as t from './actionTypes';

export default createReducer({}, {
  /**
   * TODO: add your reducer. Below is an example:
   */
  [t.INIT]: (state, action) => {
    // return a new state according to argument state and action
    // NOTICE: this must be a pure function. Don't mutate state and action.
    return state;
  }

});
