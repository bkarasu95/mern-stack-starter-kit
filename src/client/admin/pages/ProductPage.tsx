import * as React from "react";
import { Helmet } from "react-helmet";
import WYSIWYG from "../components/WYSIWYG";
class ProductPage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Add Product</title>
        </Helmet>
        <WYSIWYG />
      </>
    );
  }
}

export default ProductPage;
