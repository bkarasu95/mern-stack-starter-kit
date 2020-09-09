import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { RouteConfigComponentProps } from "react-router-config";
import { Link } from "react-router-dom";
import { Store } from "redux";
import { trans } from "../../../common/resources/lang/translate";
import { IProduct } from "../../../common/resources/types/product";
import { store } from "../store";
import { fetchProducts } from "../store/products/actions";
class ProductsPage extends React.Component<
  RouteConfigComponentProps<{}> & IProductsProps,
  IProductsState
> {
  componentDidMount() {
    if (this.props.products == null) {
      loadData(store);
    }
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Ürünler</title>
          <meta property="og:title" content="Ürünler" />
        </Helmet>
        {this.props.products != null ? (
          this.props.products.map((product: IProduct, key: string) => (
            <div className="product-card" key={key}>
              {typeof product.images !== "undefined" &&
              typeof product.images[0] !== "undefined" ? (
                <img src={product.images[0].path} alt={product.name} />
              ) : null}
              <p>{product.name}</p>
            </div>
          ))
        ) : (
          <p>{trans("general.not_found", { item: "Ürün" })}</p>
        )}
      </>
    );
  }
}

export interface IProductsProps {
  products?: any;
}

export interface IProductsState {}

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
  };
};

async function loadData(store: Store) {
  return store.dispatch(await fetchProducts());
}

export { loadData };
export default connect(mapStateToProps)(ProductsPage);
