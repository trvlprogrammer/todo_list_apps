import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  // what happen when user click submit button, it will call this function
  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // if user is autenthenticated then it will redirect to home menu/url
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <p>
              Don't have an account ? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

// if you need to access your redux you need mapStateToProps

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

// and dont forget connect function when you are accessing redux

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
