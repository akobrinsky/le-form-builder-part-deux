import './App.css';
import FormWrapper from './Containers/FormWrapper';
import 'bulma/css/bulma.css';

function App() {
  const formData = [
    {
      type: 'input',
      subtype: 'text',
      id: '1cdeka',
      label: 'First Name',
      name: 'first-name',
      placeholder: 'Your First Name',
      rules: {
        minLength: 3,
        maxLength: 8,
        textOnly: true,
        required: true,
      },
    },
    {
      type: 'input',
      subtype: 'text',
      id: '2cdeka',
      label: 'Last Name',
      name: 'last-name',
      placeholder: 'Your Last Name',
      rules: {
        minLength: 4,
        maxLength: 13,
        required: true,
      },
    },
    {
      type: 'input',
      subtype: 'text',
      id: '236cdeka',
      label: 'Zip Code',
      name: 'zip-code',
      placeholder: 'Enter your zip',
      rules: {
        minLength: 5,
        maxLength: 5,
        required: true,
        numOnly: true,
      },
    },
    {
      type: 'input',
      subtype: 'email',
      id: '21cdeka',
      label: 'Email',
      name: 'email',
      placeholder: 'Your Email Please',
      rules: {
        required: true,
      },
    },
    {
      type: 'input',
      subtype: 'number',
      id: '4cdeka',
      label: 'Age',
      name: 'age',
      max: 250,
      min: 0,
      step: 5,
      placeholder: 'Your age',
      rules: {
        required: false,
      },
    },
    {
      type: 'checkbox',
      name: 'sayhi',
      label: 'Say hi?',
      options: ['hi'],
      id: '17cdeka',
      rules: {
        required: true,
      },
    },
    {
      type: 'select',
      id: '5cdeka',
      label: 'Insrument',
      name: 'instrument',
      options: ['bass', 'drums', 'guitar'],
      placeholder: 'what is your instrument?',
      rules: {
        required: true,
      },
    },
    {
      type: 'radio',
      name: 'level',
      label: 'Level',
      options: ['amateur', 'pro', 'jedi'],
      id: '6cdeka',
      rules: {
        required: false,
      },
    },
    {
      type: 'checkbox',
      name: 'opt-in',
      label: 'What are you allergic to?',
      options: ['dogs', 'cats', 'dust', 'mold'],
      id: '7cdeka',
      rules: {
        required: true,
      },
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      id: '8cdeka',
      rows: 15,
      rules: {
        required: true,
      },
    },
  ];
  return (
    <div className="App">
      <div className="container py-5">
        <h1 className="title">Form Builder Part Deux</h1>
        <FormWrapper
          formData={formData}
          endpoint="http://localhost:3004/formstuff"
        />
      </div>
    </div>
  );
}

export default App;
