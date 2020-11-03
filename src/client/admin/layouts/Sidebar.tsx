import React from "react";
import { connect } from "react-redux";
import { ISidebarElement } from "../../../../@types/client/admin/components";
import { IUser } from "../../../../@types/common/user";
import { trans } from "../../../common/resources/lang/translate";
import NestedList from "../components/NestedList";

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  render() {
    const items: Array<ISidebarElement> = [
      // TODO get this on server via api
      { name: "dashboard", label: "Dashboard", url: "/dashboard" },
      {
        name: "product_management",
        label: trans("resource.management", { item: "Ürün" }),
        url: "/products",
      },
      {
        name: "app_management",
        label: trans("resource.management", { item: "Uygulama" }),
        items: [
          {
            name: "logs",
            label: "Kayıtlar",
            items: [
              {
                name: "app_logs",
                label: "Uygulama Kayıtları",
                url: "/logs/app"
              },
              {
                name: "panel_logs",
                label: "Admin Panel Kayıtları",
                url: "/logs/admin"
              },
              {
                name: "error_logs",
                label: "Hata Kayıtları",
                url: "/logs/error"
              },
            ]
          }

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

export interface ISidebarState { }

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Sidebar);
