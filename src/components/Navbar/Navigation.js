import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadCategories, switchCategory } from "../slices/categoriesSlice";
import "./navbar.css";


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadCategories, categories } = this.props;
    if (!categories.categories) {
      loadCategories();
    }
  }

  handleClick(categoryName) {
    const { switchCategory } = this.props;
    switchCategory(categoryName);
  }

  render() {
    const { categories, defaultCategory, isLoading } = this.props.categories;
    return (
      <nav className="navigation">
        {/* Vaiting for categories to be fetched from server */}
        {isLoading ? (
          ""
        ) : (
          <ul className="navigation-list">
            {categories.map((category) => {
              return (
                <li
                  key={category.name}
                  onClick={() => this.handleClick(category.name)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                    to={
                      category.name !== defaultCategory
                        ? `/${category.name}`
                        : `/`
                    }
                    end
                  >
                    {category.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
  switchCategory: (categoryName) => dispatch(switchCategory(categoryName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
