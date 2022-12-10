import React, { PureComponent } from "react"; 
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import CartOverlayContainer from "../components/CartOverlay/CartOverlayContainer";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import ProductDetails from "../components/ProductDetails/ProductDetailedView";
import Products from "../components/Products/Products";

import "./app.css";  

class App extends PureComponent {
  render() {
    const {categoriesLoading, cartOverlayVisible} = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <NavbarContainer />
          {cartOverlayVisible && <CartOverlayContainer />}
          {!categoriesLoading && (
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
  cartOverlayVisible: state.cart.cartOverlayVisible,
});

export default connect(mapStateToProps)(App);
