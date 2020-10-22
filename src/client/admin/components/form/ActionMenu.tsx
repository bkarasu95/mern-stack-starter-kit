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
      opened: false,
      dialogOpened: false,
    };
  }
  handleClick = (event) => {
    this.setState({ opened: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ opened: null });
  };

  handleDialogShow = () => {
    this.setState({ dialogOpened: true });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpened: false });
  };

  handleDelete = (): void => {
    const apiRequest = new ApiRequest;
    apiRequest.delete(this.props.url).then((res: any) => {
      if (res.status === 200) {
        this.handleDialogClose();
        this.props.forceRefresh(true);
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
                  {action != "delete" ? (
                    <Link
                      className={this.props.classes.link}
                      style={LinkStyle}
                      to={"/" + this.props.url + "/" + action}
                    >
                      {trans("resource." + action)}
                    </Link>
                  ) : (
                      <div>
                        <Button onClick={() => { this.handleDialogShow(); this.handleClose() }}>
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
