import { Button, TextField, FormControl } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";
import { Field, reduxForm } from "redux-form";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Dropzone from "react-dropzone";

function renderQuill({ input }) {
  return (
    <ReactQuill
      {...input}
      onChange={(newValue, delta, source) => {
        if (source === "user") {
          input.onChange(newValue);
        }
      }}
      onBlur={(range, source, quill) => {
        input.onBlur(quill.getHTML());
      }}
    />
  );
}

let AddProduct = (props) => {
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
    <form style={formStyle} onSubmit={handleSubmit}>
      <FormControl>
        <Field name="title" label="Title" component={TextField} />
      </FormControl>
      <FormControl>
        <Field name="price" label="Price" component={TextField} />
      </FormControl>
      <FormControl>
        <Field name="sku" label="Sku" component={TextField} />
      </FormControl>
      <FormControl>
        <Field name="content" component={renderQuill} label="Content" />
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

let AddProductForm = reduxForm({
  // a unique name for the form
  form: "addProductForm",
})(AddProduct);

export default AddProductForm;
