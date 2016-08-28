import React, { Component } from 'react';
import { IndexLink } from 'react-router';

export default class LinkItem extends Component {

  static propTypes = {
    link: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <li>
        <IndexLink to={this.props.link.href} activeClassName="active">
          <i className={this.props.link.className}></i>
          {` ${this.props.link.name}`}
        </IndexLink>
      </li>
    );
  }
}
