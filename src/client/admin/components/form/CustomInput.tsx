// MyCustomInput.js
import React, { Component } from "react";
import { TextField } from "@material-ui/core";

class CustomInput extends React.Component<ICustomInputProps> {
  render() {
    const {
      input: { onChange },
    } = this.props;
    return (
      <TextField
        label={this.props.label}
        value={this.props.value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      ></TextField>
    );
  }
}

interface ICustomInputProps {
  input?: any;
  label?: string;
  value?: string;
}

export default CustomInput;
