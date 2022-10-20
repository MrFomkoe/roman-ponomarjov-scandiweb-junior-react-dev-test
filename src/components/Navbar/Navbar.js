import React, { Component} from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";

export class Navbar extends Component {


  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
}

