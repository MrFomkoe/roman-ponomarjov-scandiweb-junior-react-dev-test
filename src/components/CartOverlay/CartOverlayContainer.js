// Library import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// Function import
import {
  showCartOverlay,
  increaseAmount,
  decreaseAmount,
  calculateTotalSum,
} from '../slices/cartSlice';
// Component import
import { CartOverlay } from './CartOverlay';

class CartOverlayContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    const { calculateTotalSum, currentCurrency } = this.props;
    calculateTotalSum(currentCurrency);
    document.addEventListener('click', this.handleOutsideClick);
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

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    // this.wrapperRef && !this.wrapperRef.current.contains(event.target)
    if (this.wrapperRef.current.contains(event.target)) {
      this.props.showCartOverlay();
    }
  }

  render() {
    const { cartItems, totalSum, numOfProducts } = this.props.cart;
    const { currentCurrency, increaseAmount, decreaseAmount, showCartOverlay } =
      this.props;
    const cartType = 'cart-overlay';

    return (
      <CartOverlay
        cartItems={cartItems}
        totalSum={totalSum}
        numOfProducts={numOfProducts}
        currentCurrency={currentCurrency}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
        cartType={cartType}
        wrapperRef={this.wrapperRef}
        showCartOverlay={showCartOverlay}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartOverlayContainer);
