import React, { PureComponent } from 'react';
import SingleProduct from '../SingleProduct/SingleProduct';
import './products.css';

export class Products extends PureComponent {
  render() {
    const { products, currentCategory } = this.props;
    return (
      <div className="page-container">
      <h2 className="category-name">{currentCategory}</h2>
      <div className="all-products-container">
        {
          products.map((product) => {
            return (
              <SingleProduct
                key={product.id}
                product={product}
              />
            );
          })
        }
      </div>
    </div>
    )
  }
}