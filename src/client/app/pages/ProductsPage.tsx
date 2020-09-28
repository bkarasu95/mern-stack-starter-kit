import * as React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { RouteConfigComponentProps } from "react-router-config";
import { Store } from "redux";
import { IProduct } from "../../../../@types/common/product";
import { trans } from "../../../common/resources/lang/translate";
 import ProductCard from "../components/ProductCard";
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
            <ProductCard
              name={product.name}
              images={product.images}
              sku={product.sku}
              key={key}
              slug={product.slug}
            />
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

export default {
  loadData,
  component: connect(mapStateToProps)(ProductsPage),
};
