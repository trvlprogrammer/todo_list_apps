import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { gettodoHistory, deletetodoHistory } from "../../actions/todoHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export class TodoHistory extends Component {
  // define state for currentPage and historysPerPage
  state = {
    currentPage: 1,
    historysPerPage: 5
  };

  // define the data from redux  and function
  static propTypes = {
    todoHistory: PropTypes.array.isRequired,
    deletetodoHistory: PropTypes.func.isRequired
  };

  UNSAFE_componentWillMount() {
    this.props.gettodoHistory();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    event.className = "page-item active";
  }

  render() {
    // define the variable for pagination and record of todoHistorys
    const { currentPage, historysPerPage } = this.state;
    const indexOfLastHistorys = currentPage * historysPerPage;
    const indexOfFirstHistorys = indexOfLastHistorys - historysPerPage;
    const historys = this.props.todoHistory;

    const currentHistorys = historys.slice(
      indexOfFirstHistorys,
      indexOfLastHistorys
    );

    // render the history views per page
    const renderHistorys = currentHistorys.map(todoitem => {
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
              <div className="text-center">
                <button
                  onClick={this.props.deletetodoHistory.bind(this, todoitem.id)}
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

    // define pagenumber
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(historys.length / historysPerPage); i++) {
      pageNumbers.push(i);
    }

    // render the page number view
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
        <div className="py-3">
          <div className="py-3">
            <h3>Historys List</h3>
          </div>
          <ul className="pagination pagination-sm float-right">
            {renderPagesNumbers}
          </ul>
        </div>
        <div className="container py-2 ">
          <div className="row font-weight-bold text-center">
            <div className="col-2">Date</div>
            <div className="col-9 text-left">Title</div>
            <div className="col-1 float-right ">Action</div>
          </div>
        </div>

        {renderHistorys}
      </Fragment>
    );
  }
}

// if you need to access your redux you need mapStateToProps

const mapStateToProps = state => ({
  todoHistory: state.todoHistoryReducer.todoHistory
});

export default connect(
  mapStateToProps,
  { gettodoHistory, deletetodoHistory }
)(TodoHistory);
