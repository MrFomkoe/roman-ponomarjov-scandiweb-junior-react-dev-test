// Library import
import React, { PureComponent } from 'react';
// Icon import
import { caretLeft, caretRight } from '../../app/helper-fuctions/icons';

export class CartItem extends PureComponent {
  constructor(props) {
    super(props);

    this.renderCartItemAttributes = this.renderCartItemAttributes.bind(this);
  }

  renderCartItemAttributes(attributes, cartType) {
    return attributes.map((attribute) => {
      const { name, type, value, allValues } = attribute;
      return (
        <div key={name} className={`${cartType}-item__attribute`}>
          <span>{name}</span>
          <br />
          {allValues.map((singleValue) => {
            const selectedValue = value === singleValue ? true : false;

            if (type === 'swatch') {
              return (
                <div
                  key={singleValue}
                  style={{ background: singleValue }}
                  className={`${cartType}-item__color ${
                    selectedValue && 'selected'
                  }`}
                ></div>
              );
            } else {
              return (
                <div
                  key={singleValue}
                  className={`${cartType}-item__text ${
                    selectedValue && 'selected'
                  }`}
                >
                  {singleValue}
                </div>
              );
            }
          })}
        </div>
      );
    });
  }

  render() {
    const {
      item,
      increaseAmount,
      decreaseAmount,
      cartType,
      priceToShow,
      currentImageIndex,
      gallery,
    } = this.props;

    return (
      <div className={`${cartType}-item-container`}>
        {cartType === 'cart' && <hr />}
        <div className={`${cartType}-item`}>
          <div className={`${cartType}-item__description`}>
            <div className={`${cartType}-item__details`}>
              <div>
                <h4>
                  <span className={`${cartType === 'cart' && 'heading-bold'}`}>
                    {item.brand}
                  </span>
                  <span>{item.name}</span>
                </h4>
                <span className={`${cartType}-item__price`}>
                  {priceToShow.currency.symbol} {priceToShow.amount}
                </span>
              </div>

              <div className={`${cartType}-item__attributes`}>
                {this.renderCartItemAttributes(item.attributes, cartType)}
              </div>
            </div>

            <div className={`${cartType}-item__controls`}>
              <button
                className={`${cartType}-item__btn`}
                onClick={(e) => increaseAmount(item.id)}
              >
                +
              </button>
              <span className={`${cartType}-item__amount`}>
                {item.quantity}
              </span>
              <button
                className={`${cartType}-item__btn`}
                onClick={(e) => decreaseAmount(item.id)}
              >
                -
              </button>
            </div>
          </div>

          <div className={`${cartType}-item__photo`}>
            <img src={gallery[currentImageIndex]} alt="" />
            {gallery.length > 1 && cartType === 'cart' && (
              <div className="cart-item__photo-btns">
                <button onClick={() => this.props.changeImage(-1)}>
                  {caretLeft()}
                </button>
                <button onClick={() => this.props.changeImage(1)}>
                  {caretRight()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
