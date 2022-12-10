// Library import
import React, { PureComponent } from 'react';
// Component import
import { CartItem } from './CartItem';

export class CartItemContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderCartItemAttributes = this.renderCartItemAttributes.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentImageIndex: 0,
    });
  }

  changeImage(action) {
    const { currentImageIndex } = this.state;
    const { gallery } = this.props.item;

    if (action === 1 && currentImageIndex === gallery.length - 1) {
      this.setState((prevState) => ({
        currentImageIndex: 0,
      }));
    } else if (action === -1 && currentImageIndex === 0) {
      this.setState((prevState) => ({
        currentImageIndex: gallery.length - 1,
      }));
    } else {
      this.setState((prevState) => ({
        currentImageIndex: prevState.currentImageIndex + action,
      }));
    }
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
    const { item, increaseAmount, decreaseAmount, currentCurrency, cartType } =
      this.props;
    const priceToShow = item.prices.find(
      (price) => price.currency.label === currentCurrency.label
    );
    const { gallery } = item;
    const { currentImageIndex } = this.state;

    return (
      <CartItem
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
        cartType={cartType}
        priceToShow={priceToShow}
        gallery={gallery}
        currentImageIndex={currentImageIndex}
        item={item}
        changeImage={this.changeImage}
      />
    );
  }
}
