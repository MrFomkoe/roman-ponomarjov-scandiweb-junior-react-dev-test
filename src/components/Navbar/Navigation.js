// Library import
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

export class Navigation extends PureComponent {
  render() {
    const { categories, defaultCategory, handleClick } = this.props;

    return (
      <nav className="navigation">
        <ul className="navigation-list">
          {categories.map((category) => {
            return (
              <li
                key={category.name}
                onClick={() => handleClick(category.name)}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
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
      </nav>
    );
  }
}
