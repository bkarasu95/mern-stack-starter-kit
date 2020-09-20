import React from "react";
import ListPage from "../ListPage";

class ListProductPage extends React.Component {
  render() {
    const fields = ["name", "price", "sku"];
    return <ListPage apiURL="products" name="Ürün" fields={fields} />;
  }
}

export default ListProductPage;
