import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
class HomePage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Anasayfa</title>
          <meta property="og:title" content="Anasayfa" />
        </Helmet>
        <main className="container my-5">
          <div className="d-flex">
            Anasayfaya Hoşgeldin
            <Link to="/urunler">Ürünler Sayfası</Link>
          </div>
        </main>
      </>
    );
  }
}

export default HomePage;
