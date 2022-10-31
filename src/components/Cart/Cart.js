import React, { Component } from "react";
import { connect } from "react-redux";
import { CartItem } from "../../app/features/CartItem";
import {
  calculateTotalSum,
  decreaseAmount,
  increaseAmount,
} from "../slices/cartSlice";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  // Checking and displaying current sum of order depending on the current currency
  componentDidUpdate(prevProps) {
    if (
      prevProps.cart.numOfProducts !== this.props.cart.numOfProducts ||
      prevProps.currentCurrency !== this.props.currentCurrency
    ) {
      const { calculateTotalSum, currentCurrency } = this.props;
      calculateTotalSum(currentCurrency);
    }
  }

  render() {
    const { cartItems, totalSum, numOfProducts } = this.props.cart;
    const { currentCurrency, increaseAmount, decreaseAmount } = this.props;
    const cartType = "cart";

    // Waiting for the current currency to be assigned
    if (!currentCurrency) return

    return (
      <div className="cart-container">
        <h1 className="cart-heading">CART</h1>

        {cartItems.map((item, index) => {
          return (
            <CartItem
              key={index}
              cartType={cartType}
              increaseAmount={increaseAmount}
              decreaseAmount={decreaseAmount}
              currentCurrency={currentCurrency}
              item={item}
            />
          );
        })}
        <hr />

        <div className="cart-info">
          <div className="cart-info__unit">
            <span>Tax 21%: </span>
            <span className="cart-info__bold">{currentCurrency.symbol}{(totalSum * 21 / 100.).toFixed(2)}</span>
          </div>
          <div className="cart-info__unit">
            <span>Quantity: </span>
            <span className="cart-info__bold">{numOfProducts}</span>
          </div>
          <div className="cart-info__unit">
            <span>Total: </span>
            <span className="cart-info__bold">{currentCurrency.symbol}{totalSum}</span>
          </div>
        </div>

        <button className={`cart-order-btn ${numOfProducts < 1 && 'inactive'}`} disabled={numOfProducts < 1 && true}>ORDER</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currentCurrency: state.currencies.currentCurrency,
  isLoading: state.currencies.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  increaseAmount: (id) => dispatch(increaseAmount(id)),
  decreaseAmount: (id) => dispatch(decreaseAmount(id)),
  calculateTotalSum: (currentCurrency) =>
    dispatch(calculateTotalSum(currentCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
