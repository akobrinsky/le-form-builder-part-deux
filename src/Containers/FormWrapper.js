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
        required,
        name,
        rules,
      }) => {
        const config = { required };
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
            config.rows = rows;
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
          fieldConfig: config,
        };
      }
    );

    setFormConfig(formFields);
  }, [formData]);

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
      newInfo.value = value;
    }
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
      <h1>hi</h1>
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
          />
        ))}
        <button>submit</button>
      </form>
    </div>
  );
};

export default FormWrapper;
