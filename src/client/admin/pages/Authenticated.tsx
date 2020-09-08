import { Grid } from "@material-ui/core";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import ProductsPage from "./ProductsPage";

class Authenticated extends React.Component {
  render() {
    return (
      <Grid container direction="row">
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Navbar />
          <Grid container item>
            <Switch>
              <Route exact path="/dashboard" component={HomePage} />
              <Route path="/products/create" component={ProductPage} />
              <Route path="/products" component={ProductsPage} />
            </Switch>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default Authenticated;
