import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import ProductDetails from "../components/ProductDetails/ProductDetailedView";
import Products from "../components/Products/Products";

import "./app.css";

class App extends Component {
  render() {
    const categoriesLoading = this.props.categoriesLoading;

    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          {categoriesLoading ? (
            ""
          ) : (
            <Routes>
              <Route exact path="/" element={<Products />} />
              <Route exact path="/:category" element={<Products />} />
              <Route exact path="/products/:id" element={<ProductDetails />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesLoading: state.categories.isLoading,
  currenciesLoading: state.currencies.isLoading,
});

export default connect(mapStateToProps)(App);
