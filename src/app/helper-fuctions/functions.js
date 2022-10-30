
export const renderCartItemAttributes = (attributes, cartType) => {
  return attributes.map((attribute) => {
    const { name, type, value, allValues } = attribute;
    return (
      <div key={name} className={`${cartType}-item__attribute`}>
        <span>{name}</span>
        <br />
        {allValues.map((singleValue) => {
          const selectedValue = value === singleValue ? true : false;

          if (type === "swatch") {
            return (
              <div
                key={singleValue}
                style={{ background: singleValue }}
                className={`${cartType}-item__color ${
                  selectedValue && "selected"
                }`}
              ></div>
            );
          } else {
            return (
              <div
                key={singleValue}
                className={`${cartType}-item__text ${
                  selectedValue && "selected"
                }`}
              >
                {singleValue}
              </div>
            );
          }
        })}
      </div>
    );
  });
}