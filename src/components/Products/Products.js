import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadCategoryProducts } from '../slices/productsSlice';


function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />
}

class Products extends Component {
  componentDidMount() {
    const currentCategory = this.props.currentCategory;
    const defaultCategory = this.props.defaultCategory;
    const categoryName = currentCategory ? currentCategory : defaultCategory;
    this.props.loadCategoryProducts(categoryName);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentCategory !== prevProps.currentCategory) {
      const currentCategory = this.props.currentCategory;
      this.props.loadCategoryProducts(currentCategory);
    }
  }


  render() {
    return (
      <p></p>
    )
  }
}

const mapStateToProps = state => ({ 
  defaultCategory: state.products.defaultCategory,
  currentCategory: state.products.currentCategory,
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategoryProducts: (categoryName) => dispatch(loadCategoryProducts(categoryName)),
})

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(Products)
);