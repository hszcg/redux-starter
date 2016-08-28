import createReducer from 'shared/utils/createReducer';
import * as t from './actionTypes';

export default createReducer({}, {
  [t.RESIZE]: (state, action) => {
    return {
      ...state,
      width: action.width,
      height: action.height
    };
  },

  [t.CAPTURE_OSVP_HEIGHT]: (state, action) => {
    return {
      ...state,
      heightOfDOMSeen: action.heightOfDOMSeen
    };
  }

});
