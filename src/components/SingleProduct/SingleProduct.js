import React, { Component } from "react";
import { connect } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../slices/cartSlice";
import "./singleProduct.css";
import { SingleProductForm } from "./SingleProductForm";
import { Link, useParams } from "react-router-dom";

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);

    this.state = {
      detailedView: false,
      newProductAttributes: {},
    };
  }

  handleMouseEnter() {
    this.setState((prevState) => ({
      ...prevState,
      detailedView: true,
    }));
  }

  handleMouseLeave() {
    this.setState((prevState) => ({
      ...prevState,
      detailedView: false,
      newProductAttributes: {},
    }));
  }

  handleSubmit(event) {
    const { newProductAttributes } = this.state;

    if (!newProductAttributes) return;

    event.preventDefault();
    event.target.reset();
    const { brand, id, name, prices } = this.props.product;
    const attributesArray = Object.values(newProductAttributes);

    attributesArray.unshift(id);

    const productUniqueId = attributesArray.join("-").toLowerCase();
    this.props.addItemToCart({
      initialId: id,
      id: productUniqueId,
      name: name,
      brand: brand,
      attributes: this.state.newProductAttributes,
    });

    this.setState((prevState) => ({
      ...prevState,
      newProductAttributes: {},
    }));
  }

  handleAttributesChange(inId, event) {
    const id = inId.toLowerCase();

    this.setState((prevState) => {
      return {
        ...prevState,
        newProductAttributes: {
          ...prevState.newProductAttributes,
          [id]: event.target.value,
        },
      };
    });
  }

  render() {
    const { attributes, brand, gallery, id, inStock, name, prices } =
      this.props.product;
    const { isLoading } = this.props;
    const { currentCurrency } = this.props;
    const backgroundImage = gallery[0];
    const detailedView = this.state.detailedView;

    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );
    const { amount, currency } = priceToShow;

    return (
        <div
          className={`product ${!inStock && "not-in-stock"}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Link
            className="link-to-details"
          >
          </Link>

          {/* Out of stock overlay */}
          {!inStock && <div className="not-in-stock-overlay">OUT OF STOCK</div>}

          {/* Product's main card */}
          <div className="product__inner">
            <div
              className="product-attributes"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              {/* Product attributes overlay */}
              {detailedView && inStock && (
                <SingleProductForm
                  attributes={attributes}
                  handleSubmit={this.handleSubmit}
                  handleAttributesChange={this.handleAttributesChange}
                />
              )}
            </div>

            <div className="product-description">
              <span className="product-title">
                {brand} {name}
              </span>
              <br />
              <span className="product-price">
                {currency.symbol} {amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
