import React, { Component } from "react";
import { connect } from "react-redux";
import { renderCartItemAttributes } from "../../app/helper-fuctions/functions";
import {
  calculateTotalSum,
  decreaseAmount,
  increaseAmount,
} from "../slices/cartSlice";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.renderCartItems = this.renderCartItems.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  renderCartItems(cartItems) {
    return cartItems.map((item) => {
      const { currentCurrency } = this.props;
      const priceToShow = item.prices.find(
        (price) => price.currency.label === currentCurrency.label
      );
      const {gallery} = item;
      console.log(gallery)

      return (
        <div key={item.id} className="cart-item-container">
          <hr />
          <div className="cart-item">
            <div className="cart-item__description">
              <div className="cart-item__details">
                <h4>
                  <span className="heading-bold">{item.brand}</span>
                  <span>{item.name}</span>
                </h4>
                <span className="cart-item__price">
                  {priceToShow.currency.symbol} {priceToShow.amount}
                </span>

                <div className="cart-item__attributes">
                  {renderCartItemAttributes(item.attributes, "cart")}
                </div>
              </div>

              <div className="cart-item__controls">
                <button
                  className="cart-item__btn"
                  onClick={(e) => this.props.increaseAmount(item.id)}
                >
                  +
                </button>
                <span className="cart-item__amount">{item.quantity}</span>
                <button
                  className="cart-item__btn"
                  onClick={(e) => this.props.decreaseAmount(item.id)}
                >
                  -
                </button>
              </div>
            </div>
            <div className="cart-item__photo-carousel">
              <div className="cart-item__photo-carousel__slider">
                {gallery.map((image, index) => {
                  return <img key={index} src={image} />
                })}
              </div>
              {/* <div className="cart-item__photo-carousel__btns">

              </div> */}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { cartItems, totalSum } = this.props.cart;
    const { currentCurrency } = this.props;

    return (
      <div className="cart-container">
        <h1 className="cart-heading">CART</h1>
        <div className="cart-items">{this.renderCartItems(cartItems)}</div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  increaseAmount: (id) => dispatch(increaseAmount(id)),
  decreaseAmount: (id) => dispatch(decreaseAmount(id)),
  calculateTotalSum: (currentCurrency) =>
    dispatch(calculateTotalSum(currentCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
