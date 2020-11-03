import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FieldItem } from "../../../../../../@types/client/admin/form";
import UpdatePage from "../../UpdatePage";

class UpdateProductPage extends React.Component<
 RouteComponentProps<RouteParams>> {
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
    return (
      <UpdatePage
        items={items}
        resource="products"
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
