import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  showCartOverlay,
  increaseAmount,
  decreaseAmount,
  calculateTotalSum,
} from "../slices/cartSlice";
import "./cartOverlay.css";

class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.renderCartItems = this.renderCartItems.bind(this);
    this.renderCartItemAttributes = this.renderCartItemAttributes.bind(this);
  }

  componentDidMount() {
    const { calculateTotalSum, currentCurrency } = this.props;
    calculateTotalSum(currentCurrency);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.cart.numOfProducts !== this.props.cart.numOfProducts ||
      prevProps.currentCurrency !== this.props.currentCurrency
    ) {
      const { calculateTotalSum, currentCurrency } = this.props;
      calculateTotalSum(currentCurrency);
    }
  }

  renderCartItemAttributes(attributes) {
    return attributes.map((attribute) => {
      const { name, type, value, allValues } = attribute;
      return (
        <div key={name} className="cart-overlay-item__attribute">
          <span>{name}</span>
          <br />
          {allValues.map((singleValue) => {
            const selectedValue = value === singleValue ? true : false;

            if (type === "swatch") {
              return (
                <div
                  key={singleValue}
                  style={{ background: singleValue }}
                  className={`cart-overlay-item__color ${
                    selectedValue && "selected"
                  }`}
                ></div>
              );
            } else {
              return (
                <div
                  key={singleValue}
                  className={`cart-overlay-item__text ${
                    selectedValue && "selected"
                  }`}
                >
                  {singleValue}
                </div>
              );
            }
          })}
        </div>
      );
    });
  }

  renderCartItems(cartItems) {
    return cartItems.map((item, index) => {
      const { currentCurrency } = this.props;
      const priceToShow = item.prices.find(
        (price) => price.currency.label === currentCurrency.label
      );

      return (
        <div key={item.id} className="cart-overlay-item">
          <div className="cart-overlay-item__description">
            <div className="cart-overlay-item__details">
              <h4>
                <span>{item.brand}</span>
                <br />
                <span>{item.name}</span>
              </h4>
              <span className="cart-overlay-item__price">
                {priceToShow.currency.symbol} {priceToShow.amount}
              </span>

              <div className="cart-overlay-item__attributes">
                {this.renderCartItemAttributes(item.attributes)}
              </div>
            </div>

            <div className="cart-overlay-item__controls">
              <button
                className="cart-overlay-item__btn"
                onClick={(e) => this.props.increaseAmount(item.id)}
              >
                +
              </button>
              <span className="cart-overlay-item__amount">{item.quantity}</span>
              <button
                className="cart-overlay-item__btn"
                onClick={(e) => this.props.decreaseAmount(item.id)}
              >
                -
              </button>
            </div>
          </div>
          <div className="cart-overlay-item__photo">
            <img src={item.gallery[0]} />
          </div>
        </div>
      );
    });
  }

  render() {
    const { cartItems, totalSum, showCartOverlay, numOfProducts } =
      this.props.cart;

    const { currentCurrency } = this.props;

    return (
      <div>
        {showCartOverlay && (
          <div className="cart-overlay-container">
            <div className="cart-overlay">
              <h2 className="cart-overlay-heading">
                <span className="cart-overlay-heading__bold"> My Bag</span>
                <span className="cart-overlay-heading__item-amount">
                  {numOfProducts < 1
                    ? " is empty."
                    : `, ${numOfProducts} ${
                        numOfProducts > 1 ? "items" : "item"
                      }`}
                </span>
              </h2>

              <div className="cart-overlay-items">
                {this.renderCartItems(cartItems)}
              </div>

              <div className="cart-overlay-total-sum">
                <span> Total </span>
                <span>
                  {currentCurrency.symbol} {totalSum}
                </span>
              </div>

              <div className="cart-overlay-links">
                <Link
                  to="/cart"
                  className="cart-overlay-links__cart"
                  onClick={() => this.props.showCartOverlay()}
                >
                  VIEW BAG
                </Link>
                <button className="cart-overlay-links__check">CHECK OUT</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  showCartOverlay: () => dispatch(showCartOverlay()),
  increaseAmount: (id) => dispatch(increaseAmount(id)),
  decreaseAmount: (id) => dispatch(decreaseAmount(id)),
  calculateTotalSum: (currentCurrency) =>
    dispatch(calculateTotalSum(currentCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
