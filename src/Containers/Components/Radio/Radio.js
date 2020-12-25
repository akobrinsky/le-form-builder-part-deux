import React from 'react';

const Radio = (props) => {
  return props.options.map((el, idx) => (
    <div key={`${el}-${idx}`}>
      <label className="radio" key={`radiolabel${idx}`} htmlFor={props.name}>
        <input
          className="mr-2"
          key={`radio${idx}`}
          value={el}
          name={props.name}
          checked={props.value === el}
          type="radio"
          onChange={props.changed}
        />
        {el}
      </label>
    </div>
  ));
};

export default Radio;
