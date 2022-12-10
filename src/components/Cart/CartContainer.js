import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  calculateTotalSum,
  decreaseAmount,
  increaseAmount,
} from '../slices/cartSlice';
import { Cart } from './Cart';

class CartContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentImageIndex: 0,
    });
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
  

  render() {
    const { cartItems, totalSum, numOfProducts } = this.props.cart;
    const { currentCurrency, increaseAmount, decreaseAmount } = this.props;
    const cartType = 'cart';

    // Waiting for the current currency to be assigned
    if (!currentCurrency) return;

    return (
      <Cart
        changeImage={this.changeImage}
        cartItems={cartItems}
        totalSum={totalSum}
        numOfProducts={numOfProducts}
        currentCurrency={currentCurrency}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
        cartType={cartType}
      />
    );

  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  increaseAmount: (id) => dispatch(increaseAmount(id)),
  decreaseAmount: (id) => dispatch(decreaseAmount(id)),
  calculateTotalSum: (currentCurrency) =>
    dispatch(calculateTotalSum(currentCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
