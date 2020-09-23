import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Store } from "redux";
import {
  IProduct,
  IProductImage,
} from "../../../common/resources/types/product";
import { store } from "../store";
import { fetchProduct } from "../store/products/actions";

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
    let images: any[] = [];
    const style: React.CSSProperties = {
      marginTop: "20px",
    };
    if (typeof this.props.product != "undefined") {
      if (typeof this.props.product.images != "undefined") {
        this.props.product.images.map((image: IProductImage) => {
          images.push({
            original: image.path,
            thumbnail: image.path,
            originalAlt: this.props.product.name,
            thumbnailAlt: this.props.product.name,
          });
        });
      }
    }
    return (
      <>
        {this.props.product == null ? (
          <p>Ürün Yükleniyor...</p>
        ) : (
          <>
            <Helmet>
              <title>{this.props.product.name}</title>
              <meta property="og:title" content="Ürünler" />
              {images.length > 0 ? (
                <meta property="og:image" content={images[0].original} />
              ) : null}
            </Helmet>
            <Row style={style}>
              <Col md="6">
                {images.length > 0 ? (
                  <ImageGallery
                    showPlayButton={false}
                    items={images}
                    showNav={false}
                    useBrowserFullscreen={false}
                  />
                ) : null}
              </Col>
              <Col md="6">
                <p>{this.props.product.name}</p>
                <p>{this.props.product.sku}</p>
                <p>{this.props.product.price} ₺</p>
              </Col>
            </Row>
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
