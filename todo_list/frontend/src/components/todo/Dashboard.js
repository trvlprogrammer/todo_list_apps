import React, { Fragment } from "react";
import Form from "./Form";
import Todo from "./Todo";

// meeting point antara form dan juga todo list
export default function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Todo />
    </Fragment>
  );
}
