// MyCustomInput.js
import { Switch, SwitchProps } from "@material-ui/core";
import React from "react";
import {
  FieldItem,
  IFieldItemState,
} from "../../../../../@types/client/admin/form";

class CustomSwitch extends React.Component<
  SwitchProps & ICustomSwitchProps & FieldItem,
  IFieldItemState
> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue == "true",
    };
    const {
      input: { onChange },
    } = this.props;
    onChange(this.state.value);
  }
  handleChange(e) {
    const {
      input: { onChange },
    } = this.props;
    onChange(!this.state.value);
    this.setState({ value: !this.state.value });
  }
  render() {
    return (
      <>
        <span>{this.props.label}</span>
        <Switch
          value={this.state.value}
          checked={
            typeof this.state.value === "boolean"
              ? this.state.value
              : this.state.value == "true"
          }
          onChange={(e) => this.handleChange(e)}
        />
      </>
    );
  }
}

interface ICustomSwitchProps {
  input?: any;
}

export default CustomSwitch;
