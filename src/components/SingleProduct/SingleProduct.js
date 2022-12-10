// Library imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// Icon import
import { cartIconBig } from '../../app/helper-fuctions/icons';
// Component import
import { SingleProductForm } from '../../app/features/SingleProductForm';
// CSS import
import './singleProduct.css';

export class SingleProduct extends PureComponent {
  render() {
    const { attributes, brand, id, inStock, name } = this.props.product;
    const { backgroundImage, simplifiedSelection, detailedView } = this.props;
    const { currency, amount } = this.props.priceToShow;

    return (
      <div
        className={`product ${!inStock && 'not-in-stock'}`}
        onMouseEnter={this.props.handleMouseEnter}
        onMouseLeave={this.props.handleMouseLeave}
      >
        <Link to={`/products/${id}`} className="link-to-details"></Link>

        {/* Out of stock overlay */}
        {!inStock && <div className="not-in-stock-overlay">OUT OF STOCK</div>}

        {/* Product's main card */}
        <div className="product__inner">
          <div
            className="product-attributes"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* 
              Product attributes overlay 
              Can be switched between simplified way of submission and detailed (with attribute selection)
              If the item is not in stock, it can't be added to cart
            */}
            {detailedView && inStock && (
              <div>
                {/* Simplified selection form */}
                {simplifiedSelection ? (
                  <button
                    onClick={(e) => this.handleSimplifiedSubmit()}
                    className="cart-icon-big"
                  >
                    {cartIconBig()}
                  </button>
                ) : (
                  // Advanced selection with attribute choice
                  <SingleProductForm
                    attributes={attributes}
                    handleSubmit={this.props.handleSubmit}
                    handleAttributesChange={this.props.handleAttributesChange}
                  />
                )}
              </div>
            )}
          </div>

          <div className="product-description">
            <span className="product-title">
              {brand} {name}
            </span>
            <br />
            <span className="product-price">
              {currency.symbol} {amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
