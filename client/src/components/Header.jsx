import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends Component {
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <>
            {" "}
            <li>Welcome, {this.props.auth.firstName}</li>
            <li>
              <a href="/api/logout">Log Out</a>
            </li>
          </>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys":"/"} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderAuth()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
