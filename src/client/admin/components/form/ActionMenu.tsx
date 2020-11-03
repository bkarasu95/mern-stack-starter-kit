import {
  Button,
  Menu,
  MenuItem,
  StyledComponentProps,
  withStyles
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Link } from "react-router-dom";
import {
  IActionMenuProps,
  IActionMenuState
} from "../../../../../@types/client/admin/form";
import { trans } from "../../../../common/resources/lang/translate";
import ApiRequest from './../../libraries/ApiRequest';
import ConfirmationDialog from './../ConfirmationDialog';
class ActionMenu extends React.Component<
  IActionMenuProps & StyledComponentProps,
  IActionMenuState
  > {
  constructor(props) {
    super(props);
    this.state = {
      opened: false, // is menu opened
      dialogOpened: false, // is confirmation dialog opened
    };
  }
  handleClick = (event) => { // handle menu button clicking
    this.setState({ opened: event.currentTarget });
  };

  handleClose = () => { // handle menu closing
    this.setState({ opened: null });
  };

  handleDialogShow = () => { // close confirmation dialog
    this.setState({ dialogOpened: true });
  }

  handleDialogClose = () => { // close confirmation dialog
    this.setState({ dialogOpened: false });
  };

  handleDelete = (): void => {
    const apiRequest = new ApiRequest;
    apiRequest.delete(this.props.url).then((res: any) => {
      if (res.status === 200) {
        this.handleDialogClose();
        this.props.actionResult(true);
      }
    });
  }

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
                  {action != "delete" // delete action dont have its page so it must be
                    ? (
                      <Link
                        className={this.props.classes.link}
                        style={LinkStyle}
                        to={"/" + this.props.url + "/" + action}
                      >
                        {trans("resource." + action)}
                      </Link>
                    ) : (
                      <div>
                        <Button onClick={() => {
                          // close the menu and show the confirmation dialog
                          this.handleDialogShow();
                          this.handleClose();
                        }}>
                          {trans("resource." + action)}
                        </Button>
                        <ConfirmationDialog opened={this.state.dialogOpened} closeFunction={this.handleDialogClose} actionFunction={this.handleDelete} />
                      </div>
                    )
                  }
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
