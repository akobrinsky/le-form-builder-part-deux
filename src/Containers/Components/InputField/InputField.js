import React from 'react';

const InputField = (props) => {
  let inputField = null;
  if (props.fieldType === 'input') {
    inputField = (
      <>
        <label className="label">{props.label}</label>
        <input
          className={`input ${props.inputClasses.join(' ')}`}
          name={props.name}
          {...props.config}
          value={props.value}
          onChange={(e) => props.changed(e)}
        />
      </>
    );
  } else {
    inputField = (
      <>
        <label className="label">{props.label}</label>
        <textarea
          className={`textarea ${props.inputClasses.join(' ')}`}
          name={props.name}
          {...props.config}
          value={props.value}
          onChange={(e) => props.changed(e)}
        />
      </>
    );
  }
  return inputField;
};

export default InputField;
