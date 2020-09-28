import { FormControl, Button } from "@material-ui/core";
import React from "react";
import { Field } from "redux-form";
import {
  FieldItem,
  ICustomFormProps,
} from "../../../../../@types/client/admin/form";
import CustomSwitch from "./CustomSwitch";
import CustomTextInput from "./CustomTextInput";
import ImageUploader from "./ImageUploader";
import WYSIWYG from "./WYSIWYG";

class CustomForm extends React.Component<ICustomFormProps> {
  render() {
    const formStyle: React.CSSProperties = {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    };
    const submitStyle: React.CSSProperties = {
      marginLeft: "auto",
      marginTop: "10px",
    };
    return (
      <form
        className="wysiwyg-editor"
        style={formStyle}
        onSubmit={this.props.handleSubmit}
      >
        {this.props.items.map((item: FieldItem) => {
          switch (item.type) {
            case "text":
            case "number":
              return (
                <FormControl key={item.name}>
                  <Field
                    name={item.name}
                    label={item.label}
                    component={CustomTextInput}
                  />
                </FormControl>
              );
            case "wysiwyg":
              return (
                <FormControl key={item.name}>
                  <Field name={item.name} component={WYSIWYG} />
                </FormControl>
              );
            case "switch":
              return (
                <FormControl key={item.name}>
                  <Field
                    name={item.name}
                    label={item.label}
                    component={CustomSwitch}
                  />
                </FormControl>
              );
            case "image":
              return (
                <FormControl key={item.name}>
                  <Field
                    name={item.name}
                    label={item.label}
                    component={ImageUploader}
                  />
                </FormControl>
              );
            default:
              return "Invalid Field Type: " + item.type;
          }
        })}
        <Button
          type="submit"
          style={submitStyle}
          variant="contained"
          color="primary"
        >
          Ürün Ekle
        </Button>
      </form>
    );
  }
}
export default CustomForm;
