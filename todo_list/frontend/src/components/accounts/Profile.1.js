import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profile";

export class Profile extends Component {
  static propTypes = {
    profile: PropTypes.array.isRequired,
    getProfile: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <Fragment>
        <h3>Profile</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Pofile Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.props.profile.map(profileItem => (
              <tr key={profileItem.id}>
                <td>{profileItem.first_name}</td>
                <td>{profileItem.last_name}</td>
                <td>{profileItem.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
