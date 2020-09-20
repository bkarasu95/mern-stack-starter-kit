// MyCustomInput.js
import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

class CustomTextInput extends React.Component<
  TextFieldProps & ICustomTextInputProps
> {
  render() {
    const {
      input: { onChange },
    } = this.props;
    return (
      <TextField
        label={this.props.label}
        value={this.props.value}
        type={this.props.type}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      ></TextField>
    );
  }
}

interface ICustomTextInputProps {
  input?: any;
}

export default CustomTextInput;
