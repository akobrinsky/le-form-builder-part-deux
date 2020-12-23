import logo from './logo.svg';
import './App.css';
import FormWrapper from './Containers/FormWrapper';
function App() {
  const formData = [
    {
      type: 'input',
      subtype: 'text',
      id: '1cdeka',
      label: 'First Name',
      name: 'first-name',
      required: false,
      placeholder: 'Your First Name',
      rules: {
        minLength: 5,
        maxLength: 20,
        textOnly: true,
      },
    },
    {
      type: 'input',
      subtype: 'text',
      id: '2cdeka',
      label: 'Last Name',
      name: 'last-name',
      required: true,
      placeholder: 'Your Last Name',
      rules: {
        minLength: 8,
        maxLength: 13,
        textOnly: false,
      },
    },
    {
      type: 'input',
      subtype: 'email',
      id: '21cdeka',
      label: 'Email',
      name: 'email',
      required: true,
      placeholder: 'Your Email Please',
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
      required: true,
      placeholder: 'Your age',
    },
    {
      type: 'checkbox',
      name: 'sayhi',
      label: 'Say hi?',
      options: ['hi'],
      id: '17cdeka',
      required: true,
    },
    {
      type: 'select',
      id: '5cdeka',
      label: 'Insrument',
      name: 'instrument',
      options: ['bass', 'drums', 'guitar'],
      required: true,
      placeholder: 'what is your instrument?',
    },
    {
      type: 'radio',
      name: 'level',
      label: 'Level',
      options: ['amateur', 'pro', 'jedi'],
      id: '6cdeka',
      required: false,
    },
    {
      type: 'checkbox',
      name: 'opt-in',
      label: 'What are you allergic to?',
      options: ['dogs', 'cats', 'dust', 'mold'],
      id: '7cdeka',
      required: true,
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      id: '8cdeka',
      required: true,
      rows: 15,
    },
  ];
  return (
    <div className="App">
      <FormWrapper
        formData={formData}
        endpoint="http://localhost:3004/formstuff"
      />
    </div>
  );
}

export default App;
