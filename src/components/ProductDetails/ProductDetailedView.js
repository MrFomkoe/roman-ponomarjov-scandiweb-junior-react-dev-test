import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SingleProductForm } from '../../app/features/SingleProductForm';
import { addItemToCart } from '../slices/cartSlice';
import { loadSingleProduct } from '../slices/productsSlice';
import './ProductDetailedView.css';
import parse from 'html-react-parser';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductDetails extends PureComponent {
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
  componentDidMount() {
    const { id } = this.props.params;
    const { loadSingleProduct } = this.props;
    loadSingleProduct(id);
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

    const { attributes, brand, gallery, inStock, name, prices, description } =
      this.props.productData;

    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );

    return (
      <div>
        <div className="detailed-view-container">
          <div className="product-image">
            <div className="image-slider">
              {gallery?.map((image, index) => {
                return (
                  <div key={index} className="image-container">
                    <img
                      className="image-unit"
                      src={image}
                      onClick={(e) => this.changeImage(e)}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
            <div className="main-image">
              <img
                className="image-unit"
                src={activeImage ? activeImage : gallery[0]}
                alt=""
              />
            </div>
          </div>

          <div className="product-details">
            <h2 className="product-details__brand">{brand}</h2>
            <h2 className="product-details__title">{name}</h2>

            <SingleProductForm
              attributes={attributes}
              handleSubmit={this.handleSubmit}
              handleAttributesChange={this.handleAttributesChange}
              detailedView={true}
            />
            <div className="product-price">
              <h3>PRICE:</h3>
              <span>
                {priceToShow.currency.symbol} {priceToShow.amount}{' '}
              </span>
            </div>

            {/* If item is not in stock, the "add" button will be inactive */}
            {inStock ? (
              <button
                type="submit"
                form="attributes-form"
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>
            ) : (
              <button className="add-to-cart-btn out-of-stock-btn" disabled>
                ITEM OUT OF STOCK
              </button>
            )}

            <div className="product-description-text">{parse(description)}</div>
          </div>
        </div>
      </div>
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
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
