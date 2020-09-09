import * as React from "react";
import { Helmet } from "react-helmet";
import AddProductForm from "../forms/AddProductForm";
class ProductPage extends React.Component<IProductPageProps> {
  submit = (values) => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Add Product</title>
        </Helmet>
        <AddProductForm onSubmit={this.submit} />
      </>
    );
  }
}

interface IProductPageProps {
  submit: any;
}

export default ProductPage;
