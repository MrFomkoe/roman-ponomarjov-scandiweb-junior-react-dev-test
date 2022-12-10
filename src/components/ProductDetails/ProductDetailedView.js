// Library imports
import React, { PureComponent } from 'react';
// Component imports
import { SingleProductForm } from '../../app/features/SingleProductForm';
// CSS imports
import './ProductDetailedView.css';

export class ProductDetailedView extends PureComponent {
  render() {
    const { attributes, brand, gallery, inStock, name, description } =
      this.props.productData;
    const {
      priceToShow,
      activeImage,
      parse,
      handleSubmit,
      handleAttributesChange,
      changeImage,
    } = this.props;
    return (
      <div>
        <div className="detailed-view-container">
          <div className="product-image">
            <div className="image-slider">
              {gallery?.map((image, index) => {
                return (
                  <div key={index} className="image-container">
                    <img
                      className="image-unit"
                      src={image}
                      onClick={(e) => changeImage(e)}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <div className="main-image">
              <img
                className="image-unit"
                src={activeImage ? activeImage : gallery[0]}
                alt=""
              />
            </div>
          </div>

          <div className="product-details">
            <h2 className="product-details__brand">{brand}</h2>
            <h2 className="product-details__title">{name}</h2>

            <SingleProductForm
              attributes={attributes}
              handleSubmit={handleSubmit}
              handleAttributesChange={handleAttributesChange}
              detailedView={true}
            />
            <div className="product-price">
              <h3>PRICE:</h3>
              <span>
                {priceToShow.currency.symbol} {priceToShow.amount}{' '}
              </span>
            </div>

            {/* If item is not in stock, the "add" button will be inactive */}
            {inStock ? (
              <button
                type="submit"
                form="attributes-form"
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>
            ) : (
              <button className="add-to-cart-btn out-of-stock-btn" disabled>
                ITEM OUT OF STOCK
              </button>
            )}

            <div className="product-description-text">{parse(description)}</div>
          </div>
        </div>
      </div>
    );
  }
}
