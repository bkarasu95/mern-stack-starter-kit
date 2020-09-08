import * as React from "react";
import { Helmet } from "react-helmet";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <strong>Dashboard</strong>
      </>
    );
  }
}

export default HomePage;
