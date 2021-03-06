import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Link } from "react-router-dom";
import { IMultiLevelState, ISidebarElementProps, IMenuItemProps, INestedListProps } from "../../../../@types/client/admin/components";

class SingleLevel extends React.Component<ISidebarElementProps> {
  render() {
    return (
      <ListItem key={this.props.name} button component={Link} to={this.props.url}>
        <ListItemText primary={this.props.label} />
      </ListItem>
    );
  }
}

class MultiLevel extends React.Component<ISidebarElementProps, IMultiLevelState> {
  constructor(props: ISidebarElementProps) {
    super(props);
    this.state = {
      opened: false, // is dropdown opened
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
        <ListItem button onClick={this.handleClick.bind(this)} key={this.props.name}>
          <ListItemText primary={this.props.label} />
          {this.state.opened ? <ExpandLessIcon /> : <ExpandMoreIcon /> /** change the icon according to opened state */}
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


class MenuItem extends React.Component<IMenuItemProps> {
  hasChildren(item: ISidebarElementProps): boolean { // check the item has children
    if (item.children === undefined) {
      return false;
    }

    if (item.children.constructor !== Array) {
      return false;
    }

    if (item.children.length === 0) {
      return false;
    }

    return true; // item has children
  }
  render() {
    return this.hasChildren(this.props.item) ?
      (<MultiLevel name={this.props.item.name} label={this.props.item.label} children={this.props.item.children} />) :
      (<SingleLevel name={this.props.item.name} label={this.props.item.label} url={this.props.item.url} />);
  }
}

class NestedList extends React.Component<INestedListProps> {
  render() {
    return (
      <List component="nav" aria-labelledby="nested-list-subheader">
        {this.props.items.map((item: ISidebarElementProps, key: number) => (
          <MenuItem key={key} item={item} />
        ))}
      </List>
    );
  }
}


export interface INestedListState { }

export default NestedList;
