import React, { Component } from "react";
import { connect } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../slices/cartSlice";
import "./singleProduct.css";
import { SingleProductForm } from "../../app/features/SingleProductForm";
import { Link } from "react-router-dom";
import { cartIconBig } from "../../app/helper-fuctions/icons";

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSimplifiedSubmit = this.handleSimplifiedSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);

    this.state = {
      // Change this parameter to "true" to enable simplified selection
      simplifiedSelection: false,

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

  handleSimplifiedSubmit() {
    const { attributes, brand, id, name } = this.props.product;
    
    if (attributes.length === 0) {
      this.props.addItemToCart({
        initialId: id,
        id: id,
        name: name,
        brand: brand,
        attributes: this.state.newProductAttributes,
      });
    }
  }

  handleAttributesChange(name, property) {
    this.setState((prevState) => {
      return {
        ...prevState,
        newProductAttributes: {
          ...prevState.newProductAttributes,
          // Creating nested object, so the property could be updated if another button is clicked
          [name]: {
            ...property,
            name: name,
          },
        },
      };
    });
  }

  handleSubmit(event) {
    // Prevent page reload
    event.preventDefault();
    // Reset form
    event.target.reset();

    // Variables 
    const { newProductAttributes } = this.state;
    const { brand, id, name, prices, gallery } = this.props.product;

    // Creates unique id for selected product
    const attributeNameArray = Object.values(newProductAttributes).map(attribute => attribute.id);
    attributeNameArray.unshift(id);
    const productUniqueId = attributeNameArray.join("-").toLowerCase();

    // Creating attributes array which will contain all data of the attribute
    const attributesArray = [];
    for (const key in newProductAttributes) {
      if (Object.hasOwnProperty.call(newProductAttributes, key)) {
        const element = newProductAttributes[key];
        attributesArray.push(element);
      }
    }

    // Add item to cart
    this.props.addItemToCart({
      initialId: id,
      id: productUniqueId,
      name: name,
      brand: brand,
      attributes: attributesArray,
      prices: prices,
      gallery: gallery,
    });

    // Reset attributes state
    this.setState((prevState) => ({
      ...prevState,
      newProductAttributes: {},
    }));
  }

  render() {
    const { attributes, brand, gallery, id, inStock, name, prices } =
      this.props.product;
    const { isLoading } = this.props;
    const { currentCurrency } = this.props;
    const backgroundImage = gallery[0];
    const { detailedView, simplifiedSelection } = this.state;

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
        <Link to={`/products/${id}`} className="link-to-details"></Link>

        {/* Out of stock overlay */}
        {!inStock && <div className="not-in-stock-overlay">OUT OF STOCK</div>}

        {/* Product's main card */}
        <div className="product__inner">
          <div
            className="product-attributes"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Product attributes overlay 
              Can be switched between simplified way of submission and detailed (with attribute selection)
              */}
            {detailedView && inStock && (
              <div>
                {/* Simplified selection */}
                {simplifiedSelection ? (
                  <button onClick={(e) => this.handleSimplifiedSubmit()} className="cart-icon-big">
                    {cartIconBig()}
                  </button>
                ) : (
                  // Advanced selection with attribute choice
                  <SingleProductForm
                    attributes={attributes}
                    handleSubmit={this.handleSubmit}
                    handleAttributesChange={this.handleAttributesChange}
                  />
                )}
              </div>
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