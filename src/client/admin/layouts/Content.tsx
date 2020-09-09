import React from "react";
import { Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import CreatePage from "../pages/crud/CreatePage";
import HomePage from "../pages/HomePage";

export default class Content extends React.Component {
  
  render() {
    return (
      <>
        <Row>
          <p>Content Layout</p>
        </Row>
        <Row>
          <Switch>
            <Route exact path="/dashboard" component={HomePage} />
            <Route path="/products/create" component={CreatePage} />
          </Switch>
        </Row>
      </>
    );
  }
}
