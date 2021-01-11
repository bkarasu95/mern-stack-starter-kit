import * as React from "react";
import { Link } from "react-router-dom";

// TODO it will remove on lite version
class ProductCard extends React.Component<IProductCardProps> {
  render() {
    return (
      <Link to={"/urunler/" + this.props.slug}>
        <div className="product-card">
          {typeof this.props.images !== "undefined" &&
          typeof this.props.images[0] !== "undefined" ? (
            <img src={this.props.images[0].path} alt={this.props.name} />
          ) : null}
          <p>{this.props.name}</p>
          <p>{this.props.sku}</p>
        </div>
      </Link>
    );
  }
}

interface IProductCardProps {
  name: string;
  images: any;
  sku: string;
  slug: string;
}

export default ProductCard;
