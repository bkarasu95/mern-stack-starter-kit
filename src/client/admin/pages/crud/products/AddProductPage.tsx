import React from "react";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import CreatePage from "../CreatePage";

class AddProductPage extends React.Component {
  render() {
    const items: Array<FieldItem> = [
      {
        name: "name",
        type: "text",
        label: "Title",
      },
      {
        name: "slug",
        type: "text",
        label: "URL",
      },
      {
        name: "price",
        type: "number",
        label: "Price",
      },
      {
        name: "sku",
        type: "text",
        label: "SKU",
      },
      {
        name: "status",
        type: "switch",
        label: "Status",
      },
      {
        name: "content",
        type: "wysiwyg",
        label: "Content",
      },
      {
        name: "images",
        type: "image",
        label: "Images",
      }
    ];
    return <CreatePage items={items} apiURL="products" name="Ürün" />;
  }
}

export default AddProductPage;
