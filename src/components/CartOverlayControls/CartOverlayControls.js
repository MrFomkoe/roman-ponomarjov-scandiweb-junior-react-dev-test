import React, { Component } from "react";
import { connect } from "react-redux";
import { emptyCartIcon } from "../../app/helper-fuctions/icons";
import { showCartOverlay } from "../slices/cartSlice";
import "./cartOverlayControls.css";


class CartOverlayControls extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // Handler for cart button to open or close overlay cart
  handleClick() {
    this.props.showCartOverlay();
  }

  render() {
    const { numOfProducts, showCartOverlay } = this.props.cart;

    return (
      <div className="cart-overlay-controls">
        <button
          className="cart-overlay-button"
          onClick={(e) => this.handleClick()}
        >
          {emptyCartIcon()}

          {/* Icon with amount of items */}
          {numOfProducts > 0 && (
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
