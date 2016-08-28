import React, { Component } from 'react';
import LinkItem from './LinkItem';

export default class Sidebar extends Component {

  static propTypes = {
    links: React.PropTypes.array.isRequired
  }

  state = {
    windowWidth: window.innerWidth,
    path: window.location.pathname
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  render() {
    const self = this;
    let isExpanded = true;
    const MIN_WIDTH = 768;
    if (self.state.windowWidth < MIN_WIDTH) {
      isExpanded = false;
    }
    let divClass = null;
    let divStyle = null;
    let collapseDivClass = null;
    if (isExpanded) {
      divClass = 'navbar-default nav-stacked affix';
      divStyle = { top: '' };
      collapseDivClass = '';
    } else {
      divClass = 'navbar-default nav-stacked navbar-fixed-top';
      divStyle = { top: '51px' };
      collapseDivClass = 'collapse';
    }

    let links = [];
    this.props.links.forEach(function (link) {
      links.push(<LinkItem link={link} key={link.name} />);
    });
    return (
      <nav className={divClass} style={divStyle}>
        <div id="sidebar-collapse" className={collapseDivClass}>
          <ul className="nav" id="side-menu">
            {links}
          </ul>
        </div>
      </nav>
    );
  }
}
