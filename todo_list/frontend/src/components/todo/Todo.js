import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodo, deleteTodo, archiveTodo } from "../../actions/todo";
import { getProfile } from "../../actions/profile";
import { gettodoHistory } from "../../actions/todoHistory";

export class Todo extends Component {
  static propTypes = {
    todo: PropTypes.array.isRequired,
    getTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.getTodo();
    this.props.getProfile();
  }

  render() {
    return (
      <Fragment>
        <table className="table table-striped pt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>DATE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.todo.map(todoitem => (
              <tr key={todoitem.id}>
                <td>{todoitem.id}</td>
                <td>{todoitem.name}</td>
                <td>{todoitem.description}</td>
                <td>{todoitem.date_event}</td>
                <td>
                  <div className="row">
                    <div className="float-left pr-2">
                      <button
                        onClick={this.props.archiveTodo.bind(
                          this,
                          todoitem.id,
                          {
                            id: todoitem.id,
                            name: todoitem.name,
                            description: todoitem.description,
                            date_event: todoitem.date_event,
                            event_status: false
                          }
                        )}
                        className="btn btn-primary btn-sm"
                      >
                        Done
                      </button>
                    </div>
                    <div className="float-right">
                      <button
                        onClick={this.props.deleteTodo.bind(this, todoitem.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todoReducer.todo,
  user_id: state.authReducer.user.id
});

export default connect(
  mapStateToProps,
  { getTodo, deleteTodo, getProfile, archiveTodo, gettodoHistory }
)(Todo);
