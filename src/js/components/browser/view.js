import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { debounce, throttle } from 'lodash';

class Browser extends React.Component {

  constructor(props) {
    super(props);

    this.boundHandleResize = debounce(this.handleResize.bind(this), 100);
    this.boundHandleScroll = throttle(this.saveHeightOfDOMSeen.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener('resize', this.boundHandleResize);
    this.props.dispatch(actions.captureOffScreenVPHeight(window.innerHeight + window.pageYOffset));
    window.addEventListener('scroll', this.boundHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.boundHandleResize);
    window.removeEventListener('scroll', this.boundHandleScroll);
  }

  handleResize() {
    const body = document.body;
    const width = body.offsetWidth;
    const height = body.offsetHeight;

    this.props.dispatch(actions.resize(width, height));
  }

  saveHeightOfDOMSeen() {
    const currentWindowHeightToDOM = window.innerHeight + window.pageYOffset;
    const previousHeightOfDOM = this.props.heightOfDOMSeen;
    const heightOfDOMSeen =
      (previousHeightOfDOM > currentWindowHeightToDOM)
      ? previousHeightOfDOM
      : currentWindowHeightToDOM;

    this.props.dispatch(actions.captureOffScreenVPHeight(heightOfDOMSeen));
  }

  render() {
    // it doesn't render anything actually
    return false;
  }
}

Browser.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  heightOfDOMSeen: React.PropTypes.number
};

export const stateKey = 'browser';

const mapStateToProps = (state) => {
  return {
    heightOfDOMSeen: state[stateKey].heightOfDOMSeen
  };
};

export default connect(mapStateToProps)(Browser);
