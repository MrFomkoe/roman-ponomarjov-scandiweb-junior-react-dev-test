import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="cart-container">
        <h1 className="cart-heading">CART</h1>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart,
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  // increaseAmount: (id) => dispatch(increaseAmount(id)),
  // decreaseAmount: (id) => dispatch(decreaseAmount(id)),
  // calculateTotalSum: (currentCurrency) => dispatch(calculateTotalSum(currentCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);