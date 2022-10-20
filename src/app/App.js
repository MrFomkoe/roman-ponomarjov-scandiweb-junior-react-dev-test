import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import Products from '../components/Products/Products';





class App extends Component {
  render() {
    const defaultCategory = this.props.defaultCategory;
    const currentCategory = this.props.currentCategory;

    return (
      <BrowserRouter>
        <Navbar/>
        <Routes >
          <Route exact path='/' element={<Products />} />
          <Route path='/:category' element={<Products />} />
        </Routes>
      </BrowserRouter>
        
    )
  }
}

const mapStateToProps = state => ({ 
  defaultCategory: state.products.defaultCategory,
  currentCategory: state.products.currentCategory,
});


export default connect(mapStateToProps)(App)
