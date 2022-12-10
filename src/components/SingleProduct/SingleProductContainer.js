// Library import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// Function import
import { addItemToCart } from '../slices/cartSlice';
// Component import
import { SingleProduct } from './SingleProduct';

class SingleProductContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSimplifiedSubmit = this.handleSimplifiedSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);

    this.state = {
      // Change this parameter to "true" to enable simplified selection
      simplifiedSelection: false,

      detailedView: false,
      newProductAttributes: {},
    };
  }

  // Handler for mouse enter to single product card, the product attributes form is being shown
  handleMouseEnter() {
    this.setState((prevState) => ({
      ...prevState,
      detailedView: true,
    }));
  }

  // Handler for mouse leave - hide attributes form and clear data
  handleMouseLeave() {
    this.setState((prevState) => ({
      ...prevState,
      detailedView: false,
      newProductAttributes: {},
    }));
  }

  // Submission of the product to cart in "simplifed view" (wihout attributes form)
  handleSimplifiedSubmit() {
    const { attributes, brand, id, name } = this.props.product;

    if (attributes.length === 0) {
      this.props.addItemToCart({
        initialId: id,
        id: id,
        name: name,
        brand: brand,
        attributes: this.state.newProductAttributes,
      });
    }
  }

  // Handing of the product's attributes changes
  handleAttributesChange(name, property) {
    this.setState((prevState) => {
      return {
        ...prevState,
        newProductAttributes: {
          ...prevState.newProductAttributes,
          // Creating nested object, so the property could be updated if another attribute is chosen
          [name]: {
            ...property,
            name: name,
          },
        },
      };
    });
  }

  // Submission of the product to cart in "detailed view" (with attributes form)
  handleSubmit(event) {
    // Prevent page reload
    event.preventDefault();
    // Reset form after submission
    event.target.reset();

    const { newProductAttributes } = this.state;
    const { brand, id, name, prices, gallery } = this.props.product;

    // Creates unique id for selected product
    const attributeNameArray = Object.values(newProductAttributes).map(
      (attribute) => attribute.id
    );
    attributeNameArray.unshift(id);
    const productUniqueId = attributeNameArray.join('-').toLowerCase();

    // Creating attributes array which will contain all data of the attribute
    const attributesArray = [];
    for (const key in newProductAttributes) {
      if (Object.hasOwnProperty.call(newProductAttributes, key)) {
        const element = newProductAttributes[key];
        attributesArray.push(element);
      }
    }

    // Add item to cart
    this.props.addItemToCart({
      initialId: id,
      id: productUniqueId,
      name: name,
      brand: brand,
      attributes: attributesArray,
      prices: prices,
      gallery: gallery,
    });

    // Reset attributes state
    this.setState((prevState) => ({
      ...prevState,
      newProductAttributes: {},
    }));
  }

  render() {
    const { gallery, prices } = this.props.product;
    const { currentCurrency } = this.props;
    const backgroundImage = gallery[0];
    const { detailedView, simplifiedSelection } = this.state;

    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );

    return (
      <SingleProduct
        product={this.props.product}
        backgroundImage={backgroundImage}
        detailedView={detailedView}
        simplifiedSelection={simplifiedSelection}
        priceToShow={priceToShow}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        handleSimplifiedSubmit={this.handleSimplifiedSubmit}
        handleAttributesChange={this.handleAttributesChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductContainer);
