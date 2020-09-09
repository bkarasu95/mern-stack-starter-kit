import { Grid } from "@material-ui/core";
import * as React from "react";
import Content from "../layouts/Content";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

class Authenticated extends React.Component {
  render() {
    return (
      <Grid container direction="row">
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Navbar />
          <Grid container item direction="column">
            <Content />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default Authenticated;
