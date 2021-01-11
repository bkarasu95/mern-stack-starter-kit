import React from "react";
import { FilterField, IListActions } from "../../../../../../@types/client/admin/form";
import ListPage from "../../ListPage";

class ListProductPage extends React.Component {
  render() {
    const fields = ["name", "price", "sku"];
    const actions: IListActions = ["edit", "show", "delete"];
    const filterFields: Array<FilterField> = [{
      label: "Adı",
      type: "text",
      name: "name",
    }, {
      label: "Fiyatı",
      type: "number",
      name: "price"
    }]
    return (
      <ListPage
        actions={actions}
        resource="products"
        name="Ürün" /** add the  multiple language support */
        fields={fields}
        filterItems={filterFields}
      />
    );
  }
}

export default ListProductPage;
