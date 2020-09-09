import { Button, FormControl, TextField } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Field, reduxForm } from "redux-form";
import WYSIWYG from "../../components/WYSIWYG";
import CustomInput from "../../components/form/CustomInput";

let CreateForm = (props) => {
  const { handleSubmit } = props;
  const formStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };
  const submitStyle: React.CSSProperties = {
    marginLeft: "auto",
    marginTop: "10px",
  };
  return (
    <form className="wysiwyg-editor" style={formStyle} onSubmit={handleSubmit}>
      <FormControl>
        <Field name="title" label="Title" component={CustomInput} />
      </FormControl>
      <FormControl>
        <Field name="price" label="Price" component={CustomInput} />
      </FormControl>
      <FormControl>
        <Field name="sku" label="Sku" component={CustomInput} />
      </FormControl>
      <FormControl>
        <Field name="content" component={WYSIWYG} />
      </FormControl>
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
};

let CreateFormRedux = reduxForm({
  form: "createForm", // a unique name for the form
})(CreateForm);

class CreatePage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return <CreateFormRedux onSubmit={this.submit} />;
  }
}

export default CreatePage;
