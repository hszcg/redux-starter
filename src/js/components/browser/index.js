/**
 * This component is browser only.
 *
 * It stands in web page just to listen on DOM event and update Redux state accordingly.
 *
 */

import view, { stateKey } from './view';
import reducer from './reducer';
import * as actions from './actions';

export { view, reducer, actions, stateKey };
