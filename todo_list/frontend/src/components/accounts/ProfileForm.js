import React, { Component, Fragment } from "react";
import { updateProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export class ProfileForm extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  UNSAFE_componentWillMount() {
    this.setState(this.props.profile);
    this.setState({
      redirect: false
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const id = this.props.profile.id;
    const { first_name, last_name } = this.state;
    const profileItem = { id, first_name, last_name };
    this.props.updateProfile(id, profileItem);
    this.setState({
      redirect: true
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  fileSelected = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const id = this.props.profile.id;
    const profileItem = new FormData();
    profileItem.append("image", this.state.image, this.state.image.name);
    profileItem.append("id", id);
    profileItem.append("first_name", this.state.first_name);
    profileItem.append("last_name", this.state.last_name);
    // console.log(profileItem);
    this.props.updateProfile(id, profileItem);
  };

  render() {
    const redirect = this.state.redirect;
    console.log(redirect);

    if (redirect === true) {
      return <Redirect to="/profile" />;
    }

    return (
      <Fragment>
        <h3>Profile</h3>
        <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.first_name}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.last_name}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      onChange={this.fileSelected}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile04"
                    >
                      Choose file
                    </label>
                  </div>
                  <div className="input-group-append">
                    <button
                      onClick={this.fileUploadHandler}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              {/* onChange={this.fileSelected} */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(ProfileForm);

ProfileForm;
