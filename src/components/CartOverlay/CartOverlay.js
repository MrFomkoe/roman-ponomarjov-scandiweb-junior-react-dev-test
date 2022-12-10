// Library imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// Component imports
import { CartItem } from '../../app/features/CartItem';
// CSS imports
import './cartOverlay.css';

export class CartOverlay extends PureComponent {
  render() {
    const {
      currentCurrency,
      increaseAmount,
      decreaseAmount,
      numOfProducts,
      totalSum,
      cartItems,
      cartType,
      wrapperRef,
      showCartOverlay,
    } = this.props;

    return (
      <div>
        <div className="cart-overlay-background" ref={wrapperRef}></div>
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
                onClick={() => showCartOverlay()}
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
      </div>
    );
  }
}
