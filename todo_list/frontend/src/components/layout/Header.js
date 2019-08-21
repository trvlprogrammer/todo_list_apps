import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">
            Todo List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/historys" className="nav-link text-light">
            Historys
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link text-light">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <button
            onClick={this.props.logoutUser}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link text-light">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link text-light">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-primary bg-primary">
        <div className="container">
          <span className="navbar-text mr-3 text-light">
            <strong>{user ? `Hello ${user.username}` : ""}</strong>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText" />
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
