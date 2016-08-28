import { connect } from 'react-redux';
import App from './views/App';
import { init } from './actions';

export const stateKey = 'basic';

import logoImg from './images/logo.png';

const mapStateToProps = (state) => {
  const user = state.basic;
  const headerData = {
    logo: logoImg,
    title: 'Redux Starter'
  };

  const links = [
    { name: 'Home', href: '/', className: 'fa fa-fw fa-home' }
  ];

  return {
    user,
    headerData,
    links,
  };
};

const mapDispatchToProps = {
  init,
};

const BasicContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


export default BasicContainer;
