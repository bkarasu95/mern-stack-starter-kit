import {
  Button,
  Menu,
  MenuItem,
  StyledComponentProps,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import {
  IActionMenuProps,
  IActionMenuState,
} from "../../../../../@types/client/admin/form";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { trans } from "../../../../common/resources/lang/translate";
class ActionMenu extends React.Component<
  IActionMenuProps & StyledComponentProps,
  IActionMenuState
  > {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }
  handleClick = (event) => {
    this.setState({ opened: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ opened: null });
  };

  render() {
    const LinkStyle: React.CSSProperties = {
      textDecoration: "none",
    };
    return (
      <>
        <Button aria-controls="simple-menu" onClick={this.handleClick}>
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          open={Boolean(this.state.opened)}
          onClose={this.handleClose}
          anchorEl={this.state.opened}
          keepMounted
        >
          {Object.values(this.props.actions).map(
            (action: string, index: number) => {
              return (
                <MenuItem key={index}>
                  {action != "delete" ? (
                    <Link
                      className={this.props.classes.link}
                      style={LinkStyle}
                      to={"/" + this.props.url + "/" + action}
                    >
                      {trans("resource." + action)}
                    </Link>
                  ) : (
                    
                    <p>Delete</p> /* add the delete support */
                  )}
                </MenuItem>
              );
            }
          )}
        </Menu>
      </>
    );
  }
}
const styles = (theme) => ({
  link: {
    color: theme.palette.primary.contrastText,
  },
});
export default withStyles(styles)(ActionMenu);
