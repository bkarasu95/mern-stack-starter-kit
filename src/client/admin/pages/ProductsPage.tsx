import axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";

class ProductsPage extends React.Component {
  componentDidMount() {
    axios.get("/admin/api/products", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("admin:accessToken"),
      },
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>List Products</title>
        </Helmet>
        <strong>Products</strong>
        <ul>

        </ul>
      </>
    );
  }
}

export default ProductsPage;
