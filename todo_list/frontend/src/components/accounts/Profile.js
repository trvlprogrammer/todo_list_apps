import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { getProfile, updateProfile } from "../../actions/profile";
import { Link } from "react-router-dom";

export class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    // getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  UNSAFE_componentWillMount() {
    this.setState(this.props.profile);
  }

  render() {
    // console.log(this.props.profile);
    return (
      <Fragment>
        <div className="pt-4">
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={this.props.profile.image} className="card-img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="float-right">
                    <button className="btn btn-outline-info">
                      <Link to="/profile/edit" className="text-dark">
                        Edit
                      </Link>
                    </button>
                  </div>
                  <div>
                    <h5 className="card-title">
                      Welcome {this.props.profile.first_name}{" "}
                      {this.props.profile.last_name}
                    </h5>
                  </div>
                  <p className="card-text">
                    Hay {this.state.first_name} thank you for using this app, i
                    hope this app can help you :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// if you need to access your redux you need mapStateToProps

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
  auth: state.authReducer
});

// and dont forget connect function when you are accessing redux

export default connect(
  mapStateToProps
  // { getProfile }
)(Profile);
