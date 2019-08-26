import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    // it will check the changes beetwen new prop error and previous prop error
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Title : ${error.msg.name.join()}`);
      if (error.msg.start_date)
        alert.error(`Start : ${error.msg.start_date.join()}`);
      if (error.msg.end_date) alert.error(`End : ${error.msg.end_date.join()}`);
      if (error.msg.description)
        alert.error(`Detail : ${error.msg.description.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }
    // check the message between prefious message and new message from props
    if (message !== prevProps.message) {
      if (message.todoDeleted) alert.success(message.todoDeleted);
      if (message.todoAdded) alert.success(message.todoAdded);
      if (message.todoArchived) alert.success(message.todoArchived);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

// if you need to access your redux you need mapStateToProps
const mapStateToProps = state => ({
  error: state.errorsReducer,
  message: state.messagesReducer
});

// and dont forget connect function when you are accessing redux
export default connect(mapStateToProps)(withAlert()(Alerts));
