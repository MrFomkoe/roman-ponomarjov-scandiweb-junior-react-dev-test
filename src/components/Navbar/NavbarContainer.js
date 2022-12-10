// Library imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// CSS / function imports
import { loadCategories, switchCategory } from '../slices/categoriesSlice';
import { showCartOverlay } from '../slices/cartSlice';
import {
  loadCurrencies,
  showCurrencyChanger,
  switchCurrency,
} from '../slices/currencySlice';

// Component imports 
import { Navbar } from './Navbar';

export class NavbarContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.navWrapperRef = React.createRef();
    this.controlsWrapperRef = React.createRef();
    this.currencyWrapperRef = React.createRef();

    this.handleCartOverlayClosure = this.handleCartOverlayClosure.bind(this);
    this.collapseCartOverlay = this.collapseCartOverlay.bind(this);

    this.switchCategory = this.switchCategory.bind(this);

    this.handleCurrencyChangerClosure =
      this.handleCurrencyChangerClosure.bind(this);
    this.collapseCurrencyChanger = this.collapseCurrencyChanger.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  async componentDidMount() {
    const { loadCurrencies, switchCurrency } = this.props;
    const { currencies } = this.props.currencies;
    // Upon the first run of app, currencies will be loaded and switched to "default" - first in array
    if (!currencies) {
      await loadCurrencies();
      const { currentCurrency, defaultCurrency } = this.props.currencies;
      if (!currentCurrency) {
        await switchCurrency(defaultCurrency);
      }
    }

    // Checks if categories are loaded. If not, loads them.
    const { loadCategories, categories } = this.props;
    if (!categories.categories) {
      await loadCategories();
    }

    // Event listeners for "outside clicks"
    document.addEventListener('click', this.handleCartOverlayClosure);
    document.addEventListener('click', this.handleCurrencyChangerClosure);
  }

  // Removing event listeners
  componentWillUnmount() {
    document.removeEventListener('click', this.handleCartOverlayClosure);
    document.removeEventListener(
      'mousedown',
      this.handleCurrencyChangerClosure
    );
  }

  // Handler for closure of cart overlay if clicked on navbar except currency changer and cart icon
  handleCartOverlayClosure(event) {
    const controlsWrapperRef = this.controlsWrapperRef.current.contains(
      event.target
    );
    const navWrapperRef = this.navWrapperRef.current.contains(event.target);
    const { showCartOverlay } = this.props;

    if (navWrapperRef && !controlsWrapperRef) {
      showCartOverlay(false);
      return;
    }
  }

  // Handler for cart button to open or close overlay cart
  collapseCartOverlay() {
    this.props.showCartOverlay();
  }

  // Handler for closure of the currency changer on click outside of it
  handleCurrencyChangerClosure(event) {
    if (
      this.currencyWrapperRef &&
      !this.currencyWrapperRef.current.contains(event.target)
    ) {
      this.props.showCurrencyChanger(false);
    }
  }

  // Handler for currency changer button to open or close it
  collapseCurrencyChanger() {
    this.props.showCurrencyChanger();
  }

  // Currency change handler
  handleCurrencyChange(currency) {
    const { switchCurrency, showCurrencyChanger } = this.props;
    switchCurrency(currency);
    showCurrencyChanger();
  }

  // Handler for categories' switching
  switchCategory(categoryName) {
    const { switchCategory } = this.props;
    switchCategory(categoryName);
  }

  render() {
    const { switchCategory } = this.props;
    const { numOfProducts } = this.props.cart;
    const { currencies } = this.props;

    return (
      <Navbar
        categories={this.props.categories}
        switchCategory={switchCategory}
        navWrapperRef={this.navWrapperRef}

        currencies={currencies}
        handleCurrencyChange={this.handleCurrencyChange}
        collapseCurrencyChanger={this.collapseCurrencyChanger}
        currencyWrapperRef={this.currencyWrapperRef}

        controlsWrapperRef={this.controlsWrapperRef}
        numOfProducts={numOfProducts}
        collapseCartOverlay={this.collapseCartOverlay}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  cart: state.cart,
  currencies: state.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
  showCartOverlay: (action) => dispatch(showCartOverlay(action)),
  loadCategories: () => dispatch(loadCategories()),
  showCurrencyChanger: (action) => dispatch(showCurrencyChanger(action)),
  loadCurrencies: () => dispatch(loadCurrencies()),
  switchCurrency: (currency) => dispatch(switchCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
