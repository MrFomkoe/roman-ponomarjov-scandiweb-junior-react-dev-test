import React, { Component} from "react";
import { connect } from "react-redux";
import CurrencyChanger from "../CurrencyChanger/CurrencyChanger";
import Navigation from "./Navigation";
import "./navbar.css";


export class Navbar extends Component {


  render() {
    return (
      <div className="navbar">
        <Navigation />
        <CurrencyChanger />
      </div>
    )
  }
}

