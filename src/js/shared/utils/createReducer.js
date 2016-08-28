// This a helper function to create a component reducer.

/**
 * create a reducer function.
 *
 * @initialState initial state of this component.
 * @actionhandlers  map from action type to handler
 *
 * This function just wraps basic reducer logic for:
 *  1. In case default fall through to original state is forgotten;
 *  2. Avoid lots of switch-case statements.
 */
export default function createReducer(initialState, actionHandlers) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];
    if (reduceFn) {
      return reduceFn(state, action);
    }

    // for any unrecognized action, just return original state.
    return state;
  };
}
