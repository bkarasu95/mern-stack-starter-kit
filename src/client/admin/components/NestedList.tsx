import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";
import { ISidebarElement } from "../../../../@types/client/admin/components";

class SingleLevel extends React.Component<ISidebarElement> {
  render() {   
    return (
      <ListItem
        key={this.props.name}  /** add the  multiple language support */
        button
        component={Link}
        to={this.props.url}
      >
        <ListItemText primary={this.props.label} />
      </ListItem>
    );
  }
}

class MultiLevel extends React.Component<ISidebarElement, MultiLevelState> {
  constructor(props: ISidebarElement) {
    super(props);
    this.state = {
      opened: false,
    };
  }
  handleClick() {
    this.setState({ opened: !this.state.opened });
  }
  render() {
    const innerListStyle: React.CSSProperties = {
      paddingLeft: "15px"
    }
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={this.handleClick.bind(this)}
          key={this.props.name}
        >
          <ListItemText primary={this.props.label} />{ /** add the  multiple language support */}
          {this.state.opened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={this.state.opened} timeout="auto" unmountOnExit>
          <List style={innerListStyle}>
            {this.props.children.map((child: any, key: number) => (
              <MenuItem key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

interface MultiLevelState {
  opened: boolean;
}

class MenuItem extends React.Component<MenuItemProps> {
  hasChildren(item: ISidebarElement) {
    if (item.children === undefined) {
      return false;
    }

    if (item.children.constructor !== Array) {
      return false;
    }

    if (item.children.length === 0) {
      return false;
    }

    return true;
  }
  render() {
    return hasChildren(this.props.item) ? (
      <MultiLevel
        name={this.props.item.name}
        label={this.props.item.label}
        children={this.props.item.children}
      />
    ) : (
        <SingleLevel
          name={this.props.item.name}
          label={this.props.item.label}
          url={this.props.item.url}
        />
      );
  }
}

interface MenuItemProps {
  item: ISidebarElement;
}

function hasChildren(item: ISidebarElement) {
  if (item.children === undefined) {
    return false;
  }

  if (item.children.constructor !== Array) {
    return false;
  }

  if (item.children.length === 0) {
    return false;
  }

  return true;
}

class NestedList extends React.Component<INestedListProps, INestedListState> {
  render() {
    return (
      <List component="nav" aria-labelledby="nested-list-subheader">
        {this.props.items.map((item: ISidebarElement, key: string) => (
          <MenuItem key={key} item={item} />
        ))}
      </List>
    );
  }
}

export interface INestedListProps {
  items: any; // TODO use typescript, define the object's structure
}

export interface INestedListState { }

export default NestedList;
