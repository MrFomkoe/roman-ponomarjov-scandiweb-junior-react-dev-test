import React, { Component } from "react";
import { connect } from "react-redux";
import { showCartOverlay } from "../slices/cartSlice";
import "./cartOverlay.css";

class MiniCart extends Component {
  render() {
    const { cartItems, totalSum, showCartOverlay, numOfProducts } =
      this.props.cart;

    return (
      <div>
        {showCartOverlay && (
          <div className="cart-overlay">
            <div className="mini-cart">
              <h2 className="mini-cart-heading">
                <span className="mini-cart-bold"> My Bag</span>
                <span className="mini-cart-item-amount">
                  {numOfProducts === null ? (
                    " is empty."
                  ) : (
                    `, ${numOfProducts} ${numOfProducts > 1 ? "items" : "item"}`
                  )}
                </span>
              </h2>

              
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
