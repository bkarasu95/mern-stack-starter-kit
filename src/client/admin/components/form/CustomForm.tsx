import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import {
  FieldItem,
  ICustomFormProps,
  ICustomFormState
} from "../../../../../@types/client/admin/form";
import FormFieldLoader from "./FormFieldLoader";

class CustomForm extends React.Component<ICustomFormProps, ICustomFormState> {
  constructor(props) {
    super(props);
    this.state = {
      dontRedirect: false
    }
  }
  handleContinueCheck(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ dontRedirect: !this.state.dontRedirect })
  }
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
          return <FormFieldLoader key={item.name} item={item} />
        })}
        <Grid container alignContent="flex-end">
          {/** TODO add the functionality, it has no effect for now */}
          <FormControlLabel
            value="continue"
            control={<Checkbox color="primary" checked={this.state.dontRedirect} onChange={(e) => this.handleContinueCheck(e)} />}
            label="Oluşturmaya Devam Et"
            labelPlacement="start"
          />
          <Button
            type="submit"
            style={submitStyle}
            variant="contained"
            color="primary"
          >
            Ürün Ekle
          </Button>
        </Grid>

      </form>
    );
  }
}
export default CustomForm;
