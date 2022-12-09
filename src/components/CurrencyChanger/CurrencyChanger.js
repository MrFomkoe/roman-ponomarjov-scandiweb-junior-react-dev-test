import React, { PureComponent } from 'react';
import { chevronDown, chevronUp } from '../../app/helper-fuctions/icons';
import './currencyChanger.css';

export class CurrencyChanger extends PureComponent {

  render() {
    const { currencies, currentCurrency, currencyChangerVisible } = this.props.currencies;
    return (
      <div className="currency-container" ref={this.props.wrapperRef}>
        <button className="currency-preview" onClick={() => this.props.handleClick()}>
          <div className="currency-preview__inner">
            <span className="currency-symbol"> {currentCurrency.symbol}</span>
            <span className="currency-chevron">
              {currencyChangerVisible ? chevronUp() : chevronDown()}
            </span>
          </div>
        </button>

        <div
          className={`currency-selector ${
            !currencyChangerVisible && 'hidden'
          }`}
        >
          {currencies.map((currency) => {
            return (
              <button
                className="currency-selector__option"
                key={currency.label}
                onClick={() => this.props.handleCurrencyChange(currency)}
              >
                <span className="currency-selector__symbol">
                  {' '}
                  {currency.symbol}{' '}
                </span>
                <span className="currency-selector__label">
                  {' '}
                  {currency.label}{' '}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}