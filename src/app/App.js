import React, {Component} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';




export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar/>

      </BrowserRouter>
        
    )
  }
}