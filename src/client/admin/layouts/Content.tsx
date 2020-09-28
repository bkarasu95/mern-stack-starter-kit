import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import AddProductPage from "../pages/crud/products/AddProductPage";
import ListProductPage from "../pages/crud/products/ListProductPage";
import UpdateProductPage from "../pages/crud/products/UpdateProductPage";
import HomePage from "../pages/HomePage";

export default class Content extends React.Component {
  render() {
    const styles: CSSProperties = {
      padding: "0px 15px",
      minHeight: "90vh",
    };
    return (
      <>
        <Row style={styles}>
          <Switch>
            <Route exact path="/dashboard" component={HomePage} />
            <Route path="/products/create" component={AddProductPage} />
            <Route path="/products/:id/edit" component={UpdateProductPage} />
            <Route path="/products" component={ListProductPage} />
          </Switch>
        </Row>
      </>
    );
  }
}
