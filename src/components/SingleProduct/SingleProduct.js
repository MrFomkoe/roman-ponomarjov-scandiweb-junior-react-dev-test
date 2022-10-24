import React, { Component } from "react";
import { connect } from "react-redux";
import "./singleProduct.css";

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      detailedView: false,
    };
  }

  handleMouseEnter() {
    this.setState({
      detailedView: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      detailedView: false,
    });
  }

  render() {
    const { attributes, brand, gallery, id, inStock, name, prices } =
      this.props.product;
    const { isLoading } = this.props;
    const { currentCurrency } = this.props;
    const backgroundImage = gallery[0];
    const detailedView = this.state.detailedView;

    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );
    const { amount, currency } = priceToShow;

    return (
      <div
        className={`product ${!inStock && "not-in-stock"}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {/* Out of stock overlay */}
        {!inStock && <div className="not-in-stock-overlay">OUT OF STOCK</div>}

        {/* Product's main card */}
        <div className="product__inner">
          <div
            className="product-attributes"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            {/* Product attributes overlay */}
            {this.state.detailedView && 
              <div className="product-details">
                
              </div>
            }
          </div>

          <div className="product-description">
            <span className="product-title">
              {brand} {name}
            </span>{" "}
            <br />
            <span className="product-price">
              {" "}
              {currency.symbol} {amount.toFixed(2)}{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
