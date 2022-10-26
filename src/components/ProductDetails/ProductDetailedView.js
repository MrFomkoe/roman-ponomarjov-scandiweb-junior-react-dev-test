import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { SingleProductForm } from "../SingleProduct/SingleProductForm";
import { addItemToCart } from "../slices/cartSlice";
import { loadSingleProduct } from "../slices/productsSlice";
import "./ProductDetailedView.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProductAttributes: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAttributesChange = this.handleAttributesChange.bind(this);
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
    console.log('click')
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

  render() {
    const { isLoading, addItemToCart } = this.props;
    
    {if(isLoading) return}

    const { id, attributes, brand, gallery, inStock, name, prices } =
      this.props.productData;
    
    return (
      <div>
        {isLoading ? (
          ""
        ) : (
          <div className="container">
            <div className="product-image">
              <div className="image-slider">
                {gallery.map((image, index) => {
                  return (
                    <div key={index} className="image-container">
                      <img className="image-single" src={image} />
                    </div>
                  );
                })}
              </div>
              <div className="full-image">
                <div className="image-container">
                  <img className="image-single" src={gallery[0]} />
                </div>
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
              <button type="submit" form="attributes-form" className="add-to-cart-btn"> ADD TO CART </button>
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
});

const mapDispatchToProps = (dispatch) => ({
  loadSingleProduct: (productId) => dispatch(loadSingleProduct(productId)),
  addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
