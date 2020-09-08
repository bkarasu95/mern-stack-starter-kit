import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";

class SingleLevel extends React.Component<ListItemProps> {
  render() {
    return (
      <ListItem
        key={this.props.name}
        button
        component={Link}
        to={this.props.url}
      >
        <ListItemText primary={this.props.label} />
      </ListItem>
    );
  }
}

interface ListItemProps {
  name: string;
  label: string;
  url?: string;
  items?: any;
}

class MultiLevel extends React.Component<ListItemProps, MultiLevelState> {
  constructor(props: ListItemProps) {
    super(props);
    this.state = {
      opened: false,
    };
  }
  handleClick() {
    this.setState({ opened: !this.state.opened });
  }
  render() {
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={this.handleClick.bind(this)}
          key={this.props.name}
        >
          <ListItemText primary={this.props.label} />
          {this.state.opened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={this.state.opened} timeout="auto" unmountOnExit>
          <List>
            {this.props.items.map((child: any, key: string) => (
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
  hasChildren(item: ListItemProps) {
    if (item.items === undefined) {
      return false;
    }

    if (item.items.constructor !== Array) {
      return false;
    }

    if (item.items.length === 0) {
      return false;
    }

    return true;
  }
  render() {
    return hasChildren(this.props.item) ? (
      <MultiLevel
        name={this.props.item.name}
        label={this.props.item.label}
        items={this.props.item.items}
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
  key: string;
  item: ListItemProps;
}

function hasChildren(item: ListItemProps) {
  if (item.items === undefined) {
    return false;
  }

  if (item.items.constructor !== Array) {
    return false;
  }

  if (item.items.length === 0) {
    return false;
  }

  return true;
}

class NestedList extends React.Component<INestedListProps, INestedListState> {
  render() {
    return (
      <List component="nav" aria-labelledby="nested-list-subheader">
        {this.props.items.map((item: ListItemProps, key: string) => (
          <MenuItem key={key} item={item} />
        ))}
      </List>
    );
  }
}

export interface INestedListProps {
  items: any; // TODO use typescript, define the object's structure
}

export interface INestedListState {}

export default NestedList;
