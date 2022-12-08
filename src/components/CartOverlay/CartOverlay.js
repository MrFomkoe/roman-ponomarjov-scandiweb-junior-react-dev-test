import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartItem } from '../../app/features/CartItem';
import {
  showCartOverlay,
  increaseAmount,
  decreaseAmount,
  calculateTotalSum,
} from '../slices/cartSlice';
import './cartOverlay.css';

class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    const { calculateTotalSum, currentCurrency } = this.props;
    calculateTotalSum(currentCurrency);
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
    const { cartItems, totalSum, numOfProducts } =
      this.props.cart;

    const { currentCurrency, increaseAmount, decreaseAmount } = this.props;
    const cartType = 'cart-overlay';

    return (
      <div className="cart-overlay-container">
          <div className="cart-overlay">
            <h2 className="cart-overlay-heading">
              <span className="cart-overlay-heading__bold"> My Bag</span>
              <span className="cart-overlay-heading__item-amount">
                {numOfProducts < 1
                  ? ' is empty.'
                  : `, ${numOfProducts} ${
                      numOfProducts > 1 ? 'items' : 'item'
                    }`}
              </span>
            </h2>

            <div className="cart-overlay-items">
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
              <button
                className={`cart-overlay-links__check ${
                  numOfProducts < 1 && 'inactive'
                }`}
                disabled={numOfProducts < 1 && true}
              >
                CHECK OUT
              </button>
            </div>
          </div>
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
