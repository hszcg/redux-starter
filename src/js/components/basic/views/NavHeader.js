import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class NavHeader extends Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    links: React.PropTypes.array.isRequired,
    user: React.PropTypes.object
  }

  state = {
    hover: false
  }

  onClickLoginBtn = () => {
    window.location = 'http://github.com';
  }

  mouseOverBtn = () => {
    this.setState({ hover: true });
  }

  mouseOutBtn = () => {
    this.setState({ hover: false });
  }

  render() {
    let loginBody = {};
    if (this.props.user) {
      if (this.state.hover) {
        loginBody = {
          text: ' Logout',
          icon: <i className="fa fa-sign-out"></i>
        };
      } else {
        loginBody = {
          text: ` ${this.props.user.fullName}`,
          icon: <i className="fa fa-user fa-fw"></i>
        };
      }
    } else {
      loginBody = {
        text: ' Sign in',
        icon: <i className="fa fa-sign-in"></i>
      };
    }

    const style = {
      header: {
        width: '100%',
      },
      logo: {
        display: 'inline-block',
        height: '20px',
      },
      rightDiv: {
        marginTop: '8px',
        marginRight: '15px',
      },
      logoutButton: {
        marginRight: '15px',
        minWidth: '120px',
      },
      helpLink: {
        color: '#FFF',
      }
    };

    let helpLinkText = null;
    if (this.props.data.helpLink !== null) {
      helpLinkText = (
        <a
          style={style.helpLink}
          href={this.props.data.helpLink}
          target="_blank"
        >
          Help
        </a>);
    }

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top fakeheader" role="navigation">
          <div className="navbar-header" style={style.header}>
            <a className="navbar-brand" href="/">
              <img id="logo" alt="logo" src={this.props.data.logo} style={style.logo} />
              {this.props.data.title}
            </a>
            <div className="pull-right" style={style.rightDiv}>
              <button
                id="user-login-btn"
                className="btn btn-success"
                onMouseOver={this.mouseOverBtn}
                onMouseOut={this.mouseOutBtn}
                onClick={this.onClickLoginBtn}
                style={style.logoutButton}
              >
                {loginBody.icon}
                {loginBody.text}
              </button>
              {helpLinkText}
            </div>
          </div>
        </nav>
        <Sidebar links={this.props.links} />
      </div>
    );
  }
}
