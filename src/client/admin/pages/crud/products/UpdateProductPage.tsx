import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import UpdatePage from "../UpdatePage";

class UpdateProductPage extends React.Component<
 RouteComponentProps<RouteParams>> {
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
      },
    ];
    return (
      <UpdatePage
        items={items}
        apiURL="products"
        name="Ürün"
        id={this.props.match.params.id}
      />
    );
  }
}

interface RouteParams {
    id: string;
  }
  
export default UpdateProductPage;
