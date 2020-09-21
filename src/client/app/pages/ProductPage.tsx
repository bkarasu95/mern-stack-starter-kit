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
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      loadData(store, this.props.match.params);
    }
  }
  componentDidMount() {
    if (this.props.product == null) {
      loadData(store, this.props.match.params);
    }
  }
  render() {
    return (
      <>
        {this.props.product == null ? (
          <p>Ürün Yükleniyor...</p>
        ) : (
          <>
            <p>{this.props.product.name}</p>
            <p>{this.props.product.sku}</p>
            <p>{this.props.product.price} ₺</p>
          </>
        )}
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
    product: state.products.product,
  };
};

async function loadData(store: Store, params: any) {
  return store.dispatch(await fetchProduct(params.slug));
}

export default {
  loadData,
  component: connect(mapStateToProps)(ProductPage),
};
