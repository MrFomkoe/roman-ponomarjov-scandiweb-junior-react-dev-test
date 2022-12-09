import React, { PureComponent } from 'react';
import { emptyCartIcon } from '../../app/helper-fuctions/icons';
import './cartOverlayControls.css';

export class CartOverlayControls extends PureComponent {
  render() {
    const { numOfProducts, handleClick } = this.props;

    return ( 
      <div className="cart-overlay-controls">
        <button className="cart-overlay-button" onClick={(e) => handleClick()}>
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
