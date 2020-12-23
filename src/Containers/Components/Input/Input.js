import React from 'react';
import Radio from '../Radio/Radio';
const Input = (props) => {
  let inputField = null;
  switch (props.fieldType) {
    case 'input':
      inputField = (
        <input
          name={props.name}
          {...props.config}
          value={props.value}
          onChange={(e) => props.changed(e)}
        />
      );
      break;
    case 'textarea':
      inputField = (
        <textarea
          {...props.config}
          name={props.name}
          value={props.value}
          onChange={(e) => props.changed(e)}
        />
      );
      break;
    case 'select':
      inputField = (
        <select
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={(e) => props.changed(e)}
        >
          {props.config.options.map((el) => (
            <option key={`option${el}`} value={el}>
              {el}
            </option>
          ))}
        </select>
      );
      break;
    case 'checkbox':
      inputField = (
        <div>
          {props.config.options.map((el) => (
            <>
              <label key={`label${el}`} htmlFor={el}>
                {el}
              </label>
              <input
                key={el}
                type="checkbox"
                id={el}
                name={props.name}
                checked={props.value[el]}
                onChange={(e) => props.changed(e, props.fieldType)}
              />
            </>
          ))}
        </div>
      );
      break;
    case 'radio':
      inputField = (
        <Radio
          options={props.config.options}
          changed={props.changed}
          name={props.name}
          type="radio"
          value={props.value}
        />
      );
      break;
    default:
      break;
  }
  return (
    <div>
      <label>{props.label}</label>
      {inputField}
    </div>
  );
};

export default Input;
