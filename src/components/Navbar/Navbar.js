// Library imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// CSS / function imports
import './navbar.css';
import { logoIcon } from '../../app/helper-fuctions/icons';

// Component imports
import { CartOverlayControls } from '../CartOverlayControls/CartOverlayControls';
import { CurrencyChanger } from '../CurrencyChanger/CurrencyChanger';
import { Navigation } from './Navigation';

export class Navbar extends PureComponent {
  render() {
    const { categories, defaultCategory, isLoading } = this.props.categories;
    const {
      // Categories
      switchCategory,
      // Mini-cart controls
      numOfProducts,
      controlsWrapperRef,
      collapseCartOverlay,
      // Currency changer
      currencies,
      navWrapperRef,
      handleCurrencyChange,
      collapseCurrencyChanger,
      currencyWrapperRef,
    } = this.props;

    return (
      <div className="navbar-container" ref={navWrapperRef}>
        <div className="navbar">
          {!isLoading && (
            <Navigation
              categories={categories}
              defaultCategory={defaultCategory}
              handleClick={switchCategory}
            />
          )}

          <Link
            className="shop-icon"
            to="/"
            onClick={() => switchCategory(defaultCategory)}
          >
            {logoIcon()}
          </Link>

          <div className="navbar-control-section" ref={controlsWrapperRef}>
            {currencies.currentCurrency && (
              <CurrencyChanger
                currencies={currencies}
                handleCurrencyChange={handleCurrencyChange}
                handleClick={collapseCurrencyChanger}
                wrapperRef={currencyWrapperRef}
              />
            )}

            <CartOverlayControls
              numOfProducts={numOfProducts}
              handleClick={collapseCartOverlay}
            />
          </div>
        </div>
      </div>
    );
  }
}
