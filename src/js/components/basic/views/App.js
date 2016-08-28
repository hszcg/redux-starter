import React, { Component } from 'react';

import NavHeader from './NavHeader';

class App extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    headerData: React.PropTypes.object,
    links: React.PropTypes.array,
    init: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div id="wrapper">
        <div id="nav-div">
          <NavHeader data={this.props.headerData} links={this.props.links} user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default App;
