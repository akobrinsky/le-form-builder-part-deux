import React from 'react';

const Select = (props) => {
  return (
    <div className="select">
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={(e) => props.changed(e)}
      >
        {props.config.options.map((el, idx) => (
          <option key={`option${idx}`} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
