import React from "react";
import { IListActions } from "../../../../../../@types/client/admin/form";
import ListPage from "../ListPage";

class ListProductPage extends React.Component {
  render() {
    const fields = ["name", "price", "sku"];
    const actions: IListActions = ["edit", "show", "delete"];
    return (
      <ListPage
        actions={actions}
        resource="products"
        name="Ürün"
        fields={fields}
      />
    );
  }
}

export default ListProductPage;
