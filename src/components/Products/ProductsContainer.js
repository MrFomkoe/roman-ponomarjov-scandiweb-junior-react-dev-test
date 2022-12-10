// Library import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// Function import
import { switchCategory } from '../slices/categoriesSlice';
import { loadCategoryProducts } from '../slices/productsSlice';
// Container import
import { Products } from './Products';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductsContainer extends PureComponent {
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
    const { products, isLoading, currentCategory } = this.props;

    return isLoading ? (
      'Loading...'
    ) : (
      <Products products={products} currentCategory={currentCategory} />
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
  connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
);
