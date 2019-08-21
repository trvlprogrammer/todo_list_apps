import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { gettodoHistory, deletetodoHistory } from "../../actions/todoHistory";

export class TodoHistory extends Component {
  static propTypes = {
    todoHistory: PropTypes.array.isRequired,
    deletetodoHistory: PropTypes.func.isRequired
  };

  UNSAFE_componentWillMount() {
    this.props.gettodoHistory();
  }

  render() {
    return (
      <Fragment>
        <div className="py-2">
          <h3>Todo history</h3>
        </div>
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
            {this.props.todoHistory.map(todoHistoryItem => (
              <tr key={todoHistoryItem.id}>
                <td>{todoHistoryItem.id}</td>
                <td>{todoHistoryItem.name}</td>
                <td>{todoHistoryItem.description}</td>
                <td>{todoHistoryItem.date_event}</td>
                <td>
                  <button
                    onClick={this.props.deletetodoHistory.bind(
                      this,
                      todoHistoryItem.id
                    )}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
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
  todoHistory: state.todoHistoryReducer.todoHistory
});

export default connect(
  mapStateToProps,
  { gettodoHistory, deletetodoHistory }
)(TodoHistory);
