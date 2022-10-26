import React, { Component } from "react";
import { cartIconBig } from "../../app/icons";

export class SingleProductForm extends Component {
  constructor(props) {
    super(props);

    this.renderItemAttributeType = this.renderItemAttributeType.bind(this);
    this.renderAttribute = this.renderAttribute.bind(this);
  }

  renderAttribute(attribute) {
    const { id, items, name, type } = attribute;
    const { detailedView } = this.props;

    return (
      <fieldset key={id} id={id} className="product-form__section">
        <h3>{name.toUpperCase()}:</h3>
        {items.map((item) => {
          return (
            <label key={item.id}>
              <div className="product-form__atribute">
                <input
                  type="radio"
                  name={id}
                  value={item.displayValue}
                  onClick={(e) => this.props.handleAttributesChange(id, e)}
                  required
                />
                {this.renderItemAttributeType(item, type)}
              </div>
            </label>
          );
        })}
      </fieldset>
    );
  }

  renderItemAttributeType(item, type) {
    if (type === "swatch") {
      return (
        <span
          className="displayColor"
          style={{ background: `${item.value}` }}
        ></span>
      );
    } else {
      return <span className="displayText">{item.value}</span>;
    }
  }

  render() {
    const { attributes, detailedView } = this.props;

    return (
      <form id="attributes-form" className={`product-form ${detailedView && 'detailed-view'} `} onSubmit={this.props.handleSubmit}>
        {attributes.map((attribute) => this.renderAttribute(attribute))}

        {!detailedView && (
          <button type="submit" className="cart-icon-big-btn">
            {cartIconBig()}
          </button>
        )}
      </form>
    );
  }
}
