import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import CartOverlay from "../components/CartOverlay/CartOverlay";
import { Navbar } from "../components/Navbar/Navbar";
import ProductDetails from "../components/ProductDetails/ProductDetailedView";
import Products from "../components/Products/Products";

import "./app.css";

class App extends Component {
  render() {
    const {categoriesLoading, showCartOverlay} = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          {showCartOverlay && <CartOverlay />}
          {categoriesLoading ? (
            ""
          ) : (
            <div className="app-wrapper">
              <Routes>
                <Route exact path="/" element={<Products />} />
                <Route exact path="/:category" element={<Products />} />
                <Route
                  exact
                  path="/products/:id"
                  element={<ProductDetails />}
                />
                <Route exact path="/cart" element={<Cart />} />
              </Routes>
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesLoading: state.categories.isLoading,
  currenciesLoading: state.currencies.isLoading,
  showCartOverlay: state.cart.showCartOverlay,
});

export default connect(mapStateToProps)(App);
