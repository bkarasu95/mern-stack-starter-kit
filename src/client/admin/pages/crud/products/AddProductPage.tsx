import React from "react";
import CreatePage, { FieldItem } from "../CreatePage";

class AddProductPage extends React.Component {
  render() {
    const items: Array<FieldItem> = [
      {
        name: "product[name]",
        type: "text",
        label: "Title",
      },
      {
        name: "product[slug]",
        type: "text",
        label: "URL",
      },
      {
        name: "product[price]",
        type: "number",
        label: "Price",
      },
      {
        name: "product[sku]",
        type: "text",
        label: "SKU",
      },
      {
        name: "product[status]",
        type: "switch",
        label: "Status",
      },
      {
        name: "product[content]",
        type: "wysiwyg",
        label: "Content",
      },
      {
        name: "product[images]",
        type: "image",
        label: "Images",
      }
    ];
    return <CreatePage items={items} apiURL="products" name="Ürün" />;
  }
}

export default AddProductPage;
