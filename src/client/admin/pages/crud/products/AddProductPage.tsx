import React from "react";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import CreatePage from "../CreatePage";

class AddProductPage extends React.Component {
  render() {
    const items: Array<FieldItem> = [
      {
        name: "name",
        type: "text"
      },
      {
        name: "slug",
        type: "text"
      },
      {
        name: "price",
        type: "number"
      },
      {
        name: "sku",
        type: "text"
      },
      {
        name: "status",
        type: "switch"
      },
      {
        name: "content",
        type: "wysiwyg"
      },
      {
        name: "images",
        type: "image"
      }
    ];
    return <CreatePage items={items} apiURL="products" name="Ürün" />;
  }
}

export default AddProductPage;
