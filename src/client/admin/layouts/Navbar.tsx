import React from "react";
import { store } from "..";
import { trans } from "../../../common/resources/lang/translate";
import { logout } from "../store/authenticate/actions";

class Navbar extends React.Component {
  handleLogout() {
    store.dispatch(logout());
  }

  render() {
    return (
      <nav>
        <button onClick={this.handleLogout}>{trans("forms.logout")}</button>
      </nav>
    );
  }
}

export default Navbar;
