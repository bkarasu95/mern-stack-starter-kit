import { Button, Theme } from "@material-ui/core";
import React from "react";
import { store } from "..";
import { trans } from "../../../common/resources/lang/translate";
import { logout } from "../store/authenticate/actions";
import { INavbarProps, INavbarState } from './../../../../@types/client/admin/components.d';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import { setTheme } from './../store/theme/actions';
import { connect } from "react-redux";

class Navbar extends React.Component<INavbarProps, INavbarState> {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: localStorage.getItem("admin:theme") === "dark" ? "dark" : "light"
    }
  }
  handleLogout() {
    store.dispatch(logout());
  }

  handleThemeChange() {
    const theme = this.state.darkTheme === "dark" ? "light" : "dark" ;
    this.setState({ darkTheme: theme});
    store.dispatch(setTheme(theme))
  };
  render() {
    return (
      <nav style={this.props.style}>
        <Button onClick={this.handleThemeChange.bind(this)}>
          {this.state.darkTheme === "dark" ? <DarkThemeIcon /> : <LightThemeIcon />}
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
