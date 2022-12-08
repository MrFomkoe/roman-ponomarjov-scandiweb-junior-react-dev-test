import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SingleProduct from "../SingleProduct/SingleProduct";
import { switchCategory } from "../slices/categoriesSlice";
import { loadCategoryProducts } from "../slices/productsSlice";
import "./products.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Products extends Component {

  // After mount of the component, the product category is being loaded
  async componentDidMount() {
    const {
      defaultCategory,
      switchCategory,
      currentCategory,
      loadCategoryProducts,
    } = this.props;

    if (!currentCategory) {
      // Action for first run of the website
      switchCategory(defaultCategory);
    } else {
      loadCategoryProducts(currentCategory);
    }
  }

  // When category updates, its products are being loaded 
  componentDidUpdate(prevProps, prevState) {
    const { currentCategory, loadCategoryProducts } = this.props;
    if (currentCategory !== prevProps.currentCategory) {
      loadCategoryProducts(currentCategory);
    }
  }

  render() {
    const products = this.props.products;
    const isLoading = this.props.isLoading;

    return (
      <div className="page-container">
        <h2 className="category-name">{this.props.currentCategory}</h2>
        <div className="all-products-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => {
              return (
                <SingleProduct
                  key={product.id}
                  product={product}
                  isLoading={isLoading}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.categories.currentCategory,
  defaultCategory: state.categories.defaultCategory,
  isLoading: state.products.isLoading,
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategoryProducts: (categoryName) => dispatch(loadCategoryProducts(categoryName)),
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
});


export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
