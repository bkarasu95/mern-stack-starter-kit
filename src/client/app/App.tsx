import * as React from "react";
import Routes from "../../common/resources/routes";
import Footer from "./layouts/Footer";
import { renderRoutes } from "react-router-config";
import Navbar from "./layouts/Navbar";
import { Container } from "react-bootstrap";
import ScrollToTop from "./components/ScrollToTop";

class App extends React.Component {
  render() {
    return (
      <>
        <ScrollToTop>
          <Navbar />
          <Container className="min-vh-100">
            <div>{renderRoutes(Routes)}</div>
          </Container>
          <Footer />
        </ScrollToTop>
      </>
    );
  }
}

export default App;
