import React, { Component } from "react";
import { connect } from "react-redux";
import { emptyCartIcon } from "../../app/icons";
import { showCartOverlay } from "../slices/cartSlice";
import "./cartOverlayControls.css";


class CartOverlayControls extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("clicked");
    this.props.showCartOverlay();
  }

  render() {
    const { numOfProducts } = this.props.cart;

    return (
      <div className="cart-overlay-controls">
        <button
          className="cart-overlay-button"
          onClick={(e) => this.handleClick()}
        >
          {emptyCartIcon()}
          {numOfProducts && (
            <span className="cart-overlay-product-amount">{numOfProducts}</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  showCartOverlay: () => dispatch(showCartOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayControls);
