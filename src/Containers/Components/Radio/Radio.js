import React from 'react';

const Radio = (props) => {
  return props.options.map((el, idx) => (
    <div key={idx}>
      <input
        key={`radio${idx}`}
        value={el}
        name={props.name}
        checked={props.value === el}
        type="radio"
        onChange={props.changed}
      />
      <label key={`radiolabel${idx}`} htmlFor={props.name}>
        {el}
      </label>
    </div>
  ));
};

export default Radio;
