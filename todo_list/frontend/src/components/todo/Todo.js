import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodo, deleteTodo, archiveTodo } from "../../actions/todo";
import { getProfile } from "../../actions/profile";
import { gettodoHistory } from "../../actions/todoHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export class Todo extends Component {
  state = {
    currentPage: 1,
    todosPerPage: 5
  };

  static propTypes = {
    todo: PropTypes.array.isRequired,
    getTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired
  };

  // this function will be called the first time
  componentDidMount() {
    this.props.getTodo();
    this.props.getProfile();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    event.className = "page-item active";
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodos = currentPage * todosPerPage;
    const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
    const todos = this.props.todo;
    const currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);

    const renderTodos = currentTodos.map(todoitem => {
      return (
        <div
          className="container py-2 border-top border-primary"
          key={todoitem.id}
        >
          <div className="row">
            <div className="col-2">{todoitem.date_event}</div>
            <a
              className="col-8 text-left "
              data-toggle="collapse"
              data-target={`#collapse${todoitem.id}`}
              aria-expanded="false"
              aria-controls={`collapse${todoitem.id}`}
            >
              {todoitem.name}
            </a>
            <div className="col-2">
              <div className="float-left pr-2">
                <button
                  onClick={this.props.archiveTodo.bind(this, todoitem.id, {
                    id: todoitem.id,
                    name: todoitem.name,
                    description: todoitem.description,
                    date_event: todoitem.date_event,
                    event_status: false
                  })}
                  className="btn btn-outline-primary"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
              <div className="">
                <button
                  onClick={this.props.deleteTodo.bind(this, todoitem.id)}
                  className="btn btn-outline-danger"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </div>
          <div className="collapse" id={`collapse${todoitem.id}`}>
            <div className="card card-body mt-4 mb-4">
              {todoitem.description}
            </div>
          </div>
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPagesNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          className={
            this.state.currentPage === number ? "page-item active" : "page-item"
          }
        >
          <span
            id={number}
            onClick={this.handleClick.bind(this)}
            className="page-link"
          >
            {number}
          </span>
        </li>
      );
    });
    return (
      <Fragment>
        <div className="pb-3">
          <ul className="pagination pagination-sm float-right">
            {renderPagesNumbers}
          </ul>
        </div>
        <div className="container py-2 ">
          <div className="row font-weight-bold">
            <div className="col-2">Date</div>
            <div className="col-8 text-left">Title</div>
            <div className="col-2 float-right">Action</div>
          </div>
        </div>
        {renderTodos}

        {/* {this.props.todo.map(todoitem => ( */}

        {/* // ))} */}
      </Fragment>
    );
  }
}

// if you need to access your redux you need mapStateToProps

const mapStateToProps = state => ({
  todo: state.todoReducer.todo,
  user_id: state.authReducer.user.id
});

// and dont forget connect function when you are accessing redux

export default connect(
  mapStateToProps,
  { getTodo, deleteTodo, getProfile, archiveTodo, gettodoHistory }
)(Todo);
