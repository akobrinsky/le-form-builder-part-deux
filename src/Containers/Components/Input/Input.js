import React from 'react';
import Radio from '../Radio/Radio';
import InputField from '../InputField/InputField';
import CheckBox from '../Checkbox/Checkbox';
import Select from '../Select/Select';

const Input = (props) => {
  let inputField = null;
  let errorMessage = null;
  const inputClasses = [];

  if (!props.valid && props.touched) {
    inputClasses.push('is-danger');
    if (props.errors) {
      errorMessage = Object.entries(props.errors).map(([key, val], idx) => (
        <p key={`${key}${idx}`} className="help is-danger">
          {val}
        </p>
      ));
    }
  }

  if (props.valid && props.touched) inputClasses.push('is-success');

  switch (props.fieldType) {
    case 'input':
    case 'textarea':
      inputField = (
        <InputField
          inputClasses={inputClasses}
          id={props.id}
          name={props.name}
          config={props.config}
          value={props.value}
          changed={props.changed}
          label={props.label}
          fieldType={props.fieldType}
        />
      );
      break;
    case 'select':
      inputField = (
        <Select
          changed={props.changed}
          fieldType={props.fieldType}
          name={props.name}
          id={props.id}
          value={props.value}
          config={props.config}
        />
      );
      break;
    case 'checkbox':
      inputField = (
        <CheckBox
          fieldType={props.fieldType}
          changed={props.changed}
          id={props.id}
          value={props.value}
          name={props.name}
          config={props.config}
        />
      );
      break;
    case 'radio':
      inputField = (
        <Radio
          options={props.config.options}
          changed={props.changed}
          name={props.name}
          id={props.id}
          type="radio"
          value={props.value}
        />
      );
      break;
    default:
      break;
  }
  return (
    <div className="field">
      {props.fieldType === 'select' ||
        (props.fieldType === 'checkbox' && (
          <label className="label">{props.label}</label>
        ))}
      <div className="control">{inputField}</div>
      {errorMessage}
    </div>
  );
};

export default Input;
