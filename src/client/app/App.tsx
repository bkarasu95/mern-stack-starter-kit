import * as React from "react";
import Routes from "../../common/resources/routes";
import Footer from "./layouts/Footer";
import { renderRoutes } from "react-router-config";
import Navbar from "./layouts/Navbar";

class App extends React.Component {
  render() {
    return (
      <div className="min-vh-100 z-991">
        <Navbar />
        <div>{renderRoutes(Routes)}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
