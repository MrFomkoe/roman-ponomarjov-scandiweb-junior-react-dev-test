// Library imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
// Function imports
import { addItemToCart } from '../slices/cartSlice';
import { loadSingleProduct } from '../slices/productsSlice';

// Component imports
import { ProductDetailedView } from './ProductDetailedView';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductDetailedViewContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newProductAttributes: {},
      activeImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  // Upon mount of the component, its details are being loaded from server
  async componentDidMount() {
    const { id } = this.props.params;
    const { loadSingleProduct } = this.props;
    await loadSingleProduct(id);
  }

  // Handing of the product's attributes changes
  handleAttributesChange(name, property) {
    this.setState((prevState) => {
      return {
        ...prevState,
        newProductAttributes: {
          ...prevState.newProductAttributes,
          // Creating nested object, so the property could be updated if another button is clicked
          [name]: {
            ...property,
            name: name,
          },
        },
      };
    });
  }

  handleSubmit(event) {
    // Prevent page reload
    event.preventDefault();
    // Reset form
    event.target.reset();

    // Variables
    const { newProductAttributes } = this.state;
    const { brand, id, name, prices, gallery } = this.props.productData;

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

  // Change of the current "main" image being displayed
  changeImage({ target }) {
    const imageSrc = target.src;
    this.setState((prevState) => {
      return {
        ...prevState,
        activeImage: imageSrc,
      };
    });
  }

  render() {
    const { isLoading, currentCurrency } = this.props;
    const { activeImage } = this.state;

    if (isLoading) {
      return;
    }

    // Variable are defined after product data is loaded
    const { prices } = this.props.productData;

    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );

    return (
      <ProductDetailedView 
      productData={this.props.productData}
      activeImage={activeImage}
      priceToShow={priceToShow}
      parse={parse}
      handleAttributesChange={this.handleAttributesChange}
      handleSubmit={this.handleSubmit}
      changeImage={this.changeImage}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.products.singleProduct,
  isLoading: state.products.singleProductLoading,
  currentCurrency: state.currencies.currentCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  loadSingleProduct: (productId) => dispatch(loadSingleProduct(productId)),
  addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetailedViewContainer)
);
