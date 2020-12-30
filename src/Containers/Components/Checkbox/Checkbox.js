import React from 'react';

const CheckBox = (props) => {
  return props.config.options.map((el, idx) => (
    <label className="checkbox mr-2" key={`${props.id}-${idx}`} htmlFor={el}>
      <input
        key={el}
        type="checkbox"
        id={el}
        className="mr-1"
        name={props.name}
        checked={props.value[el]}
        onChange={(e) => props.changed(e, props.fieldType)}
      />
      {el}
    </label>
  ));
};

export default CheckBox;
