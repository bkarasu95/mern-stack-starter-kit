import { Button, Theme } from "@material-ui/core";
import React from "react";
import { store } from "..";
import { trans } from "../../../common/resources/lang/translate";
import { logout } from "../store/authenticate/actions";
import { INavbarProps, INavbarState } from './../../../../@types/client/admin/layouts.d';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import { setTheme } from './../store/theme/actions';
import { connect } from "react-redux";

class Navbar extends React.Component<INavbarProps, INavbarState> {
  handleLogout() {
    store.dispatch(logout()); // trigger the admin logout
  }

  handleThemeChange() {
    store.dispatch(setTheme(this.props.theme.palette.type === "dark" ? "light" : "dark"))
  };
  render() {
    return (
      <nav style={this.props.style}>
        <Button onClick={this.handleThemeChange.bind(this)}>
          {this.props.theme.palette.type === "dark" ? <DarkThemeIcon /> : <LightThemeIcon />}
        </Button>
        <Button onClick={this.handleLogout}>{trans("forms.logout")}</Button>
      </nav>
    );
  }
}


const mapStateToProps = (state: any) => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps)(Navbar);
