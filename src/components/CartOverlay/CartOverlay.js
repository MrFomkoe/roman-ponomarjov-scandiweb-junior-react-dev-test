import React, { Component } from "react";
import { connect } from "react-redux";
import { emptyCartIcon } from "../../app/icons";
import "./cartOverlay.css"

class CartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {cartItem, numOfProducts, totalSum} = this.props.cart;

    return (
      <div className="cart-overlay-container">
        <button className="cart-overlay-button">
          {emptyCartIcon()}

          {numOfProducts && <span className="cart-overlay-product-amount">{numOfProducts}</span>}

          
        </button>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);