import React, { Fragment } from "react";
import Form from "./Form";
import Todo from "./Todo";

// meeting point beetwen todo list data and form todo list
export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Todo />
    </Fragment>
  );
}
