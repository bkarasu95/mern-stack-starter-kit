// MyCustomInput.js
import { Switch, SwitchProps } from "@material-ui/core";
import React from "react";

class CustomSwitch extends React.Component<SwitchProps & ICustomSwitchProps> {
  render() {
    const {
      input: { onChange },
    } = this.props;
    return (
      <>
        <span>Status</span>
        <Switch
          onChange={(e, c) => {
            onChange(c);
          }}
        />
      </>
    );
  }
}

interface ICustomSwitchProps {
  input?: any;
}

export default CustomSwitch;
