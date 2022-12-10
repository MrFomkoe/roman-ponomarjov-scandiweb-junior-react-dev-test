import React, { PureComponent } from "react"; 
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContainer from "../components/Cart/CartContainer";
import CartOverlayContainer from "../components/CartOverlay/CartOverlayContainer";
import NavbarContainer from "../components/Navbar/NavbarContainer";
import ProductDetailedViewContainer from "../components/ProductDetails/ProductDetailedViewContainer";
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
                  element={<ProductDetailedViewContainer />}
                />
                <Route exact path="/cart" element={<CartContainer />} />
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
