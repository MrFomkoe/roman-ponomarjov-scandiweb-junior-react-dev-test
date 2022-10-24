import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import Products from "../components/Products/Products";
import './app.css';

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
              <Route path="/:category" element={<Products />} />
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
