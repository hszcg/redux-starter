import { connect } from 'react-redux';

import Home from './view';
import { init } from './actions';

export const stateKey = 'home';

/**
 * map state to props.
 */
const mapStateToProps = (state) => {
  return state[stateKey] || {};
};

/**
 * map state to props.
 *
 * TODO: if all your props are simple mapping to dispatch action creators. You can use
 * ```
 *  const mapDispatchToProps = {
 *    init
 *  };
 * ```
 */
const mapDispatchToProps = (dispatch) => {
  // TODO: add more prop here
  return {
    init: () => {
      dispatch(init());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
