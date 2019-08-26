import React, { Component } from "react";
import { addTodo } from "../../actions/todo";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Form extends Component {
  state = {
    name: "",
    description: "",
    date_event: ""
  };

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  // onchange on form
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // when submit button is clicked
  onSubmit = e => {
    e.preventDefault();
    const { name, description, date_event } = this.state;
    const todo = { name, description, date_event };
    this.props.addTodo(todo);
    this.setState({
      name: "",
      description: "",
      date_event: ""
    });
  };

  render() {
    // define variable from state
    const { name, description, date_event } = this.state;

    return (
      <div className="pb-2">
        <div className="py-2">
          <h3>Todo List</h3>
        </div>
        <button
          className="btn btn-primary "
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Add
        </button>
        <div className="collapse" id="collapseExample">
          <div className="card card-body mt-4 mb-4">
            <h2>Add Todo Item</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                  className="form-control"
                />
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    className="form-control"
                    onChange={this.onChange}
                    value={description}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date_event"
                    className="form-control"
                    onChange={this.onChange}
                    value={date_event}
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
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(Form);
