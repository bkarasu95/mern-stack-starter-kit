import React from "react";
import { connect } from "react-redux";
import { ISidebarElement } from "../../../../@types/client/admin/components";
import { IUser } from "../../../../@types/common/user";
import { trans } from "../../../common/resources/lang/translate";
import NestedList from "../components/NestedList";
import ApiRequest from "../libraries/ApiRequest";

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    }
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester.get('admin-menu').then((res: any) => {
      this.setState({ listItems: res.data.data });
    });
  }
  render() {   
    return (
      <>
        <p>{trans("sidebar.greetings", { name: this.props.user.name })}</p>
        {this.state.listItems.length > 0 && <NestedList items={this.state.listItems} />}
      </>
    );
  }
}

export interface ISidebarProps {
  user: IUser;
}

export interface ISidebarState {
  listItems: Array<ISidebarElement>
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Sidebar);
