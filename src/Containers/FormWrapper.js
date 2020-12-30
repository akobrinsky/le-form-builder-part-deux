import React, { useState, useEffect } from 'react';
import Input from './Components/Input/Input';

const FormWrapper = ({ formData, endpoint }) => {
  const [formConfig, setFormConfig] = useState({});

  useEffect(() => {
    const formFields = { ...formConfig };
    formData.forEach(
      ({
        label,
        id,
        placeholder,
        max,
        min,
        step,
        rows,
        subtype,
        options,
        type,
        name,
        rules,
      }) => {
        const config = {};
        // input subtype is for reg input fields, subtype is email, number or text
        if (subtype) {
          config.type = subtype;
          if (subtype === 'number') {
            config.max = max;
            config.min = min;
            config.step = step;
          } else {
            config.placeholder = placeholder || label;
          }
        }

        if (!subtype) {
          // otherwise build out config for radios, select, textarea, checkbox
          if (type === 'textarea') {
            // config.rows = rows;
            config.placeholder = placeholder || label;
          } else {
            // options is an array of options for radios, select and checkbox
            config.options = options;
          }
        }

        let value = '';
        // if checkbox type... value will be an object of booleans for each option
        if (type === 'checkbox') {
          value = {};
          options.forEach((el) => {
            value[el] = false;
          });
        }

        formFields[name] = {
          value,
          label,
          type,
          id,
          fieldConfig: { ...config, required: rules.required },
          rules,
          valid: false,
          touched: false,
          // errors: [],
        };
        if (rules) {
          formFields[name].errors = {};
          Object.entries(formFields[name].rules).forEach(([key, val]) => {
            formFields[name].errors[key] = '';
          });
        }
      }
    );

    setFormConfig(formFields);
  }, [formData]);

  const checkValidity = (val, rules, name) => {
    let isValid = true;

    const updatedValues = { ...formConfig[name] };
    // is required
    if (rules.required) {
      if (val.trim() === '') {
        isValid = false;
        updatedValues.errors.required = `This field is required`;
      } else {
        updatedValues.errors.required = '';
      }
    }
    // email
    if (name === 'email') {
      if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val.trim())) {
        isValid = false;
        updatedValues.errors.email = 'Please enter a valid email address';
      } else {
        updatedValues.errors.email = '';
      }
    }
    // maxLength
    if (rules.maxLength) {
      if (val.trim().length > rules.maxLength) {
        isValid = false;
        updatedValues.errors.maxLength = `Too long, must be less than or equal to ${rules.maxLength} characters`;
      } else {
        updatedValues.errors.maxLength = '';
      }
    }
    // minLength
    if (rules.minLength && rules.minLength !== rules.maxLength) {
      if (val.trim().length < rules.minLength) {
        isValid = false;
        updatedValues.errors.minLength = `Too short, must be greater than or equal to ${rules.minLength} characters`;
      } else {
        updatedValues.errors.minLength = '';
      }
    }
    if (rules.minLength === rules.maxLength) {
      if (val.trim().length < rules.minLength) {
        isValid = false;
        updatedValues.errors.equalLength = `Must be exactly ${rules.minLength} numbers`;
      } else {
        updatedValues.errors.equalLength = ``;
      }
    }
    // should only have text... textOnly
    if (rules.textOnly) {
      if (!/^[a-zA-Z]*$/.test(val.trim())) {
        isValid = false;
        updatedValues.errors.textOnly = `Should only include letters not numbers or other characters`;
      } else {
        updatedValues.errors.textOnly = '';
      }
    }
    // should only have numbers... numOnly
    if (rules.numOnly) {
      if (!/^[0-9]*$/.test(val.trim())) {
        isValid = false;
        updatedValues.errors.numOnly = `Should only include numbers not letters or other characters`;
      } else {
        updatedValues.errors.numOnly = '';
      }
    }

    setFormConfig((formConfig[name] = updatedValues));
    return isValid;
  };

  const handleInputChange = (evt, type) => {
    const { value, name, id } = evt.target;
    const updatedForm = { ...formConfig };
    const newInfo = { ...updatedForm[name] };

    // checkbox type is the only one that has an object of booleans
    if (type === 'checkbox') {
      const options = { ...newInfo.value };
      options[id] = !options[id];
      newInfo.value = { ...options };
    } else {
      newInfo.valid = checkValidity(value, newInfo.rules, name);
      newInfo.value = value;
    }
    newInfo.touched = true;
    updatedForm[name] = newInfo;
    setFormConfig(updatedForm);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const id = Math.floor(Math.random() * 50);
    const dataToSubmit = { id };
    Object.entries(formConfig).forEach(([key, value]) => {
      dataToSubmit[key] = value.value;
    });
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {Object.entries(formConfig).map(([key, value]) => (
          <Input
            label={value.label}
            fieldType={value.type}
            id={key}
            key={value.id}
            name={key}
            config={value.fieldConfig}
            value={value.value}
            changed={handleInputChange}
            valid={value.valid}
            shouldValidate={value.hasOwnProperty('rules')}
            touched={value.touched}
            errors={value.errors}
          />
        ))}
        <div className="control">
          <button className="button is-link">submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;
