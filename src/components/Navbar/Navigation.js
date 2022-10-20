import React, { Component} from "react";
import { connect } from "react-redux";
import { NavLink, Link, useParams } from "react-router-dom";
import { loadCategories } from "../slices/categoriesSlice";
import { switchCategory } from "../slices/productsSlice";



function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  handleClick(categoryName) {
    this.props.switchCategory(categoryName);
  }

  render() {
    const categories = this.props.categories.categories;
    const isLoading = this.props.categories.isLoading;
    return (
      <div>
        {
          isLoading ?

          <p> Loading...</p> :

          <ul>
            {categories.map(category => {
              return (
                <li key={category.name} onClick={() => this.handleClick(category.name)}>
                  <NavLink 
                    to={(category.name === 'all') ? "/" : `/${category.name}`}
                    
                    >
                    {category.name}
                  </NavLink>
                </li>
              )
            })}

          </ul>
        }

      </div>
    )
  }
}


const mapStateToProps = state => ({ 
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
})

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);