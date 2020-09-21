import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Store } from "redux";
import { fetchProduct } from "../store/products/actions";
import { store } from "../store";
import { IProduct } from "../../../common/resources/types/product";

class ProductPage extends React.Component<
  RouteComponentProps<RouteParams> & IProductProps
> {
  componentDidMount() {
    if (this.props.product == null) {
      loadData(store, this.props.match.params.slug);
    }
  }
  render() {
    return (
      <>
        <p>{this.props.product.name}</p>
        <p>{this.props.product.sku}</p>
        <p>{this.props.product.price} ₺</p> 
      </>
    );
  }
}
interface RouteParams {
  slug: string;
}
export interface IProductProps {
  product: IProduct;
}
const mapStateToProps = (state: any) => {
  return {
    product: state.products.products[0],
  };
};

async function loadData(store: Store, slug: string) {
  return store.dispatch(await fetchProduct(slug));
}
export { loadData };
export default connect(mapStateToProps)(ProductPage);
