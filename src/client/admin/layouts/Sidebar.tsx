import React from "react";
import { connect } from "react-redux";
import { IUser } from "../../../../@types/common/user";
import { trans } from "../../../common/resources/lang/translate";
import NestedList from "../components/NestedList";

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  render() {
    const items = [
      // TODO get this on server via api
      { name: "dashboard", label: "Dashboard", url: "/dashboard", sort: 1 },
      {
        name: "product_management",
        label: trans("resource.management", { item: "Ürün" }),
        sort: 2,
        items: [
          {
            name: "add_product",
            label: trans("resource.add", { item: "Ürün" }),
            url: "/products/create",
            sort: 1,
          },
          {
            name: "list_product",
            label: trans("resource.list", { item: "Ürün" }),
            url: "/products",
            sort: 2,
          }, 
        ],
      },
    ];
    return (
      <>
        <p>{trans("sidebar.greetings", { name: this.props.user.name })}</p>
        <NestedList items={items} />
      </>
    );
  }
}

export interface ISidebarProps {
  user: IUser;
}

export interface ISidebarState {}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Sidebar);
