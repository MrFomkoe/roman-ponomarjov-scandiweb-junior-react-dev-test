import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleProductForm } from "../../app/features/SingleProductForm";
import { addItemToCart } from "../slices/cartSlice";
import { loadSingleProduct } from "../slices/productsSlice";
import "./ProductDetailedView.css";
import parse from "html-react-parser";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProductAttributes: {},
      activeImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;
    const { loadSingleProduct } = this.props;
    loadSingleProduct(id);
  }

  handleAttributesChange(inId, event) {
    const id = inId.toLowerCase();

    this.setState((prevState) => {
      return {
        ...prevState,
        newProductAttributes: {
          ...prevState.newProductAttributes,
          [id]: event.target.value,
        },
      };
    });
  }

  handleSubmit(event) {
    console.log("click");
    event.preventDefault();
    event.target.reset();

    const { newProductAttributes } = this.state;
    const { brand, id, name, prices } = this.props.productData;

    // Creates unique id for selected product
    const attributesArray = Object.values(newProductAttributes);
    attributesArray.unshift(id);
    const productUniqueId = attributesArray.join("-").toLowerCase();

    this.props.addItemToCart({
      initialId: id,
      id: productUniqueId,
      name: name,
      brand: brand,
      attributes: this.state.newProductAttributes,
    });

    this.setState((prevState) => ({
      ...prevState,
      newProductAttributes: {},
    }));
  }

  changeImage({target}) {
    const imageSrc = target.src;
    this.setState((prevState) => {
      return {
        ...prevState,
        activeImage: imageSrc,
      }
    })
  }

  handleScroll(event) {
    // event.currentTarget.scrollLeft += event.deltaY;

  }

  render() {
    const { isLoading, currentCurrency } = this.props;
    const { activeImage } = this.state;

    {
      if (isLoading) return;
    }

    const {
      id,
      attributes,
      brand,
      gallery,
      inStock,
      name,
      prices,
      description,
    } = this.props.productData;
    const priceToShow = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );

    return (
      <div >
        {isLoading ? (
          ""
        ) : (
          <div className="detailed-view-container">
            <div className="product-image">
              <div className="image-slider" onWheel={(e) => this.handleScroll(e)}>
                {gallery?.map((image, index) => {
                  return (
                    <div key={index} className="image-container">
                      <img className="image-unit" src={image} onClick={e => this.changeImage(e)} />
                    </div>
                  );
                })}
              </div>
              <div className="main-image">
                <img className="image-unit" src={activeImage ? activeImage : gallery[0]} />
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
                  {priceToShow.currency.symbol} {priceToShow.amount}{" "}
                </span>
              </div>

              <button
                type="submit"
                form="attributes-form"
                className="add-to-cart-btn"
              >
                ADD TO CART
              </button>

              <div className="product-description-text">
                {parse(description)}
              </div>
            </div>
          </div>
        )}
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
