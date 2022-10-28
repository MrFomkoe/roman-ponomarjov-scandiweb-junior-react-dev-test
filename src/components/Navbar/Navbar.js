import React, { Component } from "react";
import { connect } from "react-redux";
import CurrencyChanger from "../CurrencyChanger/CurrencyChanger";
import Navigation from "./Navigation";
import "./navbar.css";
import { logoIcon } from "../../app/icons";
import CartOverlayControls from "../CartOverlayControls/CartOverlayControls";

export class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <Navigation />
        {logoIcon()}
        <div className="navbar-control-section">
          <CurrencyChanger />
          <CartOverlayControls />
        </div>
      </div>
    );
  }
}
