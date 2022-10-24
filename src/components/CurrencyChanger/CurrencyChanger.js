import React, { Component } from "react";
import { connect } from "react-redux";
import { chevronDown, chevronUp } from "../../app/icons";
import { loadCurrencies, switchCurrency } from "../slices/currencySlice";
import "./currencyChanger.css";

class CurrencyChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseCurrencyChanger: false,
    };

    this.wrapperRef =  React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
    const { loadCurrencies, switchCurrency } = this.props;
    const { currencies } = this.props.currencies;
    if (!currencies) {
      await loadCurrencies();
      const { currentCurrency, defaultCurrency } = this.props.currencies;
      if (!currentCurrency) {
        await switchCurrency(defaultCurrency);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick); 
  }

  handleClick() {
    this.setState({
      collapseCurrencyChanger: this.state.collapseCurrencyChanger
        ? false
        : true,
    });
  }

  handleCurrencyChange(currency) {
    const { switchCurrency } = this.props;
    switchCurrency(currency);
    this.setState({
      collapseCurrencyChanger: false,
    })
  }

  handleOutsideClick(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if(this.state.collapseCurrencyChanger) {
        this.setState({
          collapseCurrencyChanger: false,
        })
      }
    }
  }

  render() {
    const { currencies, currentCurrency } = this.props.currencies;
    const { collapseCurrencyChanger } = this.state;

    return (
      <div className="currency-container" ref={this.wrapperRef}>
        <button className="currency-preview" onClick={() => this.handleClick()}>
          <div className="currency-preview__inner">
            <span className="currency-symbol"> {currentCurrency.symbol}</span>
            <span className="currency-chevron">
              {collapseCurrencyChanger ? chevronUp() : chevronDown()}
            </span>
          </div>
        </button>

        <div
          
          className={`currency-selector ${
            !collapseCurrencyChanger && "hidden"
          }`}
        >
          {currencies.map((currency) => {
            return (
              <button
                className="currency-selector__option"
                key={currency.label}
                onClick={() => this.handleCurrencyChange(currency)}
              >
                <span className="currency-selector__symbol"> {currency.symbol} </span>
                <span className="currency-selector__label"> {currency.label} </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(loadCurrencies()),
  switchCurrency: (currency) => dispatch(switchCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChanger);
