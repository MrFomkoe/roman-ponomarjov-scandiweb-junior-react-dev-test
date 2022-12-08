import React, { Component } from 'react';
import CurrencyChanger from '../CurrencyChanger/CurrencyChanger';
import Navigation from './Navigation';
import './navbar.css';
import { logoIcon } from '../../app/helper-fuctions/icons';
import CartOverlayControls from '../CartOverlayControls/CartOverlayControls';
import { switchCategory } from '../slices/categoriesSlice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    const { defaultCategory } = this.props.categories;
    const { switchCategory } = this.props;

    return (
      <div className="navbar">
        <Navigation />

        <Link
          className="shop-icon"
          to="/"
          onClick={() => switchCategory(defaultCategory)}
        >
          {logoIcon()}
        </Link>

        <div className="navbar-control-section">
          <CurrencyChanger />
          <CartOverlayControls />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
