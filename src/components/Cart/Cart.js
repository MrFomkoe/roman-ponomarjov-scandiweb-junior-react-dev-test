// Library imports
import React, { PureComponent } from 'react';
// Component imports
import { CartItem } from '../../app/features/CartItem';
// CSS imports
import './cart.css';

export class Cart extends PureComponent {
  render() {
    const {
      currentCurrency,
      increaseAmount,
      decreaseAmount,
      numOfProducts,
      totalSum,
      cartItems,
      cartType,
      changeImage,
    } = this.props;

    return (
      <div className="cart-container">
        <h1 className="cart-heading">CART</h1>

        {cartItems.map((item, index) => {
          return (
            <CartItem
              changeImage={changeImage}
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
            <span className="cart-info__bold">
              {currentCurrency.symbol}
              {((totalSum * 21) / 100).toFixed(2)}
            </span>
          </div>
          <div className="cart-info__unit">
            <span>Quantity: </span>
            <span className="cart-info__bold">{numOfProducts}</span>
          </div>
          <div className="cart-info__unit">
            <span>Total: </span>
            <span className="cart-info__bold">
              {currentCurrency.symbol}
              {totalSum}
            </span>
          </div>
        </div>

        <button
          className={`cart-order-btn ${numOfProducts < 1 && 'inactive'}`}
          disabled={numOfProducts < 1 && true}
        >
          ORDER
        </button>
      </div>
    );
  }
}
