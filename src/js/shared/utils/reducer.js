/**
 * combine reducers from given components
 *
 */
export function combine(components) {
  const allReducers = {
    // common sub-state is reserved for framework
    common: (f = {}) => f
  };

  components.forEach((component) => {
    const defaultApi = component.default;

    // if given component exports default, we suppost it is a React.js view
    if (!defaultApi) {
      const { view, reducer, stateKey } = component;
      if (!view) {
        throw new Error('component should export view');
      }
      if (!stateKey) {
        throw new Error('component should export stateKey');
      }
      if (reducer) {
        allReducers[stateKey] = reducer;
      }
    }
  });

  return allReducers;
}
