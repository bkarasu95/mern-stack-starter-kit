import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
class HomePage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Anasayfa</title>
          <meta property="og:title" content="Anasayfa" />
        </Helmet>
        <Row>
          <Col>Anasayfaya Hoşgeldiniz</Col>
        </Row>
        <Row>
          <Col>
            <Link to="/urunler">Ürünler Sayfası</Link>
          </Col>
          <Col>
            <Link to="/hakkimizda">Hakkımızda Sayfası</Link>
          </Col>
        </Row>
      </>
    );
  }
}

export default HomePage;
