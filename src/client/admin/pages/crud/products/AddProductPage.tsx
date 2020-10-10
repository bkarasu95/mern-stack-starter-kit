import React from "react";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import CreatePage from "../CreatePage";

class AddProductPage extends React.Component {
  render() {
    const items: Array<FieldItem> = [
      {
        name: "name",
        type: "text",
        initialValue: Math.random() + Date.now()
      },
      {
        name: "slug",
        type: "text",
        initialValue: Math.random() + Date.now()
      },
      {
        name: "price",
        type: "number",
        initialValue: Math.floor(Math.random() * 100)
      },
      {
        name: "sku",
        type: "text",
        initialValue: Math.random() + Date.now()
      },
      {
        name: "status",
        type: "switch",
        initialValue: Date.now() % 2
      },
      {
        name: "content",
        type: "wysiwyg",
        initialValue: Math.random() + Date.now()
      },
      {
        name: "images",
        type: "image"
      }
    ];
    return <CreatePage items={items} resource="products" name="Ürün" />;
  }
}

export default AddProductPage;
