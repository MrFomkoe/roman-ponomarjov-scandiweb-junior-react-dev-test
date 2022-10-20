import React, { Component} from "react";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadCategories } from "../slices/categoriesSlice";


function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />
}

class Navigation extends Component {
  componentDidMount() {
    this.props.loadCategories();
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
                <li key={category.name}>
                  <NavLink to={`/${category.name}`}>
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
  categories: state.categories 
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
})

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);