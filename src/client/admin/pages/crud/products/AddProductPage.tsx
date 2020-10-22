import React from "react";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import CreatePage from "../CreatePage";
import faker from "faker";
class AddProductPage extends React.Component {
  render() {
    const items: Array<FieldItem> = [
      {
        name: "name",
        type: "text",
        initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.productName()
      },
      {
        name: "slug",
        type: "text",
      },
      {
        name: "price",
        type: "number",
        initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.price()
      },
      {
        name: "sku",
        type: "text",
        initialValue: process.env.NODE_ENV === "production" ? null : faker.lorem.word()
      },
      {
        name: "status",
        type: "switch",
        initialValue: Date.now() % 2 == 1
      },
      {
        name: "content",
        type: "wysiwyg",
        initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.productDescription()
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
