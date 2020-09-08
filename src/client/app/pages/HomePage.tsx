import * as React from "react";
import { Link } from "react-router-dom";
class HomePage extends React.Component {
  render() {
    return (
      <main className="container my-5">
        Anasayfaya Hoşgeldin
        <Link to="/urunler">Ürünler Sayfası</Link>
      </main>
    );
  }
}

export default HomePage;
