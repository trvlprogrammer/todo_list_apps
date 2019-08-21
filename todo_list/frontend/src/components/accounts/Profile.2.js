import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile, updateProfile } from "../../actions/profile";

export class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  UNSAFE_componentWillMount() {
    this.setState(this.props.profile);
  }

  onSubmit = e => {
    e.preventDefault();
    // console.log(this.state.image);
    // console.log(this.state.image.name);
    // const image = this.state.image;
    const profileItem = new FormData();
    profileItem.append("image", this.state.image, this.state.image.name);
    profileItem.append("id", this.props.profile.id);
    // profileItem.append("")
    const id = this.props.profile.id;
    // const image = this.state.image;
    // image.append(this.state.image, this.state.image.name);
    // const image = fd;
    // console.log(fd);
    // const { first_name, last_name } = this.state;
    // const profileItem = { id, image };
    // console.log(profileItem);
    this.props.updateProfile(id, profileItem);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  fileSelected = e => {
    // let files = e.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = e => {
    //   this.setState({
    //     image: e.target.result
    //   });
    // };
    // console.log(event.target.files[0]);
    this.setState({
      image: e.target.files[0]
    });
  };

  render() {
    // console.log(this.props.profile);
    return (
      <Fragment>
        <h3>Profile</h3>
        <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {/* <div className="form-group">
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
              </div> */}
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={this.fileSelected}
                  // value={this.state.last_name}
                />
              </div>
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
  { getProfile, updateProfile }
)(Profile);
