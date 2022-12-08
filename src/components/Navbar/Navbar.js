import React, { Component } from 'react';
import CurrencyChanger from '../CurrencyChanger/CurrencyChanger';
import Navigation from './Navigation';
import './navbar.css';
import { logoIcon } from '../../app/helper-fuctions/icons';
import CartOverlayControls from '../CartOverlayControls/CartOverlayControls';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Navigation />

        <Link
          className="shop-icon"
          to="/"
          onClick={() => this.props.showCartOverlay()}
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
