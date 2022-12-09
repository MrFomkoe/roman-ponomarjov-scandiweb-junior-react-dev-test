import React, { PureComponent } from 'react';
import CurrencyChanger from '../CurrencyChanger/CurrencyChanger';
import Navigation from './Navigation';
import './navbar.css';
import { logoIcon } from '../../app/helper-fuctions/icons';
import CartOverlayControls from '../CartOverlayControls/CartOverlayControls';
import { switchCategory } from '../slices/categoriesSlice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showCartOverlay } from '../slices/cartSlice';

export class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.navWrapperRef = React.createRef();
    this.controlsWrapperRef = React.createRef();
    this.handleCartOverlayClosure = this.handleCartOverlayClosure.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCartOverlayClosure);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCartOverlayClosure);
  }

  handleCartOverlayClosure(event) {
    const controlsWrapperRef = this.controlsWrapperRef.current.contains(event.target);
    const navWrapperRef = this.navWrapperRef.current.contains(event.target);
    const { showCartOverlay } = this.props;

    if (navWrapperRef && !controlsWrapperRef) {
      showCartOverlay(false)
    }
  }

  render() {
    const { defaultCategory } = this.props.categories;
    const { switchCategory } = this.props;

    return (
      <div className="navbar-container" ref={this.navWrapperRef}>
        <div className="navbar">
          <Navigation />

          <Link
            className="shop-icon"
            to="/"
            onClick={() => switchCategory(defaultCategory)}
          >
            {logoIcon()}
          </Link>

          <div className="navbar-control-section" ref={this.controlsWrapperRef}>
            <CurrencyChanger />
            <CartOverlayControls />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
  showCartOverlay: (action) => dispatch(showCartOverlay(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
