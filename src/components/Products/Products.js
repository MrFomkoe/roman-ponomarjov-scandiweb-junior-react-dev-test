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
  componentDidMount() {
    const { defaultCategory, switchCategory, currentCategory } = this.props;
    if (!currentCategory) {
      switchCategory(defaultCategory);
    } else {
      loadCategoryProducts(currentCategory);
    }
  }

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
        <h2>{this.props.currentCategory}</h2>
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
  loadCategoryProducts: (categoryName) =>
    dispatch(loadCategoryProducts(categoryName)),
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
});

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);
