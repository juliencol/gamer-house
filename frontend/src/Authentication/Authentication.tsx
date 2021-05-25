import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import './Authentication.css';

interface propsAuthentication {
  setAuthentication: (state: boolean) => void;
}

const ERRORS_VALUES = {
  empty: () => `This field is empty!`,
  tooShort: (name: string, minimalLength: number) =>
    `The ${name} is too short! (must be longer than ${minimalLength})`,
};

const MINIMAL_FIELDS = ['username', 'password'];
type formMinimalFields = 'username' | 'password';
export type formMaximalFields = formMinimalFields | 'confirmPassword' | 'email';

function Authentication(props: propsAuthentication) {
  const [isOnLoginPage, setIsOnLoginPage] = useState(true);

  const defaultFormValue: { [key in formMaximalFields]: string } = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  const [formData, setFormData] = useState(defaultFormValue);

  const defaultErrors: { [key in formMaximalFields]: Array<string> } = {
    username: [],
    password: [],
    confirmPassword: [],
    email: [],
  };
  const [formErrors, setFormErrors] = useState(defaultErrors);

  function handleSwitch() {
    setFormData({
      ...defaultFormValue,
    });
    setFormErrors({
      ...defaultErrors,
    });
    setIsOnLoginPage(!isOnLoginPage);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    const name: formMaximalFields = e.target.name as formMaximalFields;

    setFormData({
      ...formData,
      [name]: value,
    });

    const currentErrors: Array<string> = [];
    const errorSamePassword: Array<string> = [];
    const notIdenticalPassword = 'The passwords fields are not identical!';

    if (value.length > 0) {
      switch (name) {
        case 'username':
          currentErrors.push(...usernameValidation(value));
          break;
        case 'password':
          currentErrors.push(...passwordVerification(value));
          if (value !== formData.confirmPassword) {
            errorSamePassword.push(notIdenticalPassword);
          }
          break;
        case 'confirmPassword':
          if (value !== formData.password) {
            errorSamePassword.push(notIdenticalPassword);
          }
          break;
        case 'email':
          currentErrors.push(...emailVerification(value));
          break;
        default:
          break;
      }
    } else {
      currentErrors.push(ERRORS_VALUES.empty());
    }

    if (name === 'password' || name === 'confirmPassword') {
      setFormErrors({
        ...formErrors,
        [name]: currentErrors,
        confirmPassword: errorSamePassword,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: currentErrors,
      });
    }
  }

  function usernameValidation(value: string) {
    const errorsArray: Array<string> = [];
    if (value.length < 5) {
      errorsArray.push(ERRORS_VALUES.tooShort('username', 5));
    }
    return errorsArray;
  }

  function passwordVerification(value: string) {
    const errorsArray: Array<string> = [];
    if (value.length < 8) {
      errorsArray.push(ERRORS_VALUES.tooShort('password', 8));
    }
    if (value.search('[a-z]') === -1) {
      errorsArray.push('The password must have at least one letter in lower case');
    }
    if (value.search('[A-Z]') === -1) {
      errorsArray.push('The password must have at least one letter in upper case');
    }
    if (value.search('[0-9]') === -1) {
      errorsArray.push('The password must have at least one number');
    }
    return errorsArray;
  }

  function emailVerification(value: string) {
    const errorsArray: Array<string> = [];
    if (value.search('@') === -1) {
      errorsArray.push('The email is not valid');
    }
    return errorsArray;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const areAllFieldsFilled = Object.entries(formData).some(([field, value]) =>
      isOnLoginPage && !MINIMAL_FIELDS.includes(field) ? false : value.length === 0
    );
    const isThereAnyError = Object.entries(formErrors).some(([field, errors]) =>
      isOnLoginPage && !MINIMAL_FIELDS.includes(field) ? false : errors.length > 0
    );

    if (areAllFieldsFilled || isThereAnyError) {
      alert('Some fields are not valid');
      return;
    }
    //TODO Send form data to the back
    console.log('Submitted');
    console.log(formData);
  }

  const actionName = (
    <>
      <span>Sign </span>
      <span className="PurpleText">{isOnLoginPage ? 'In' : 'Up'} </span>
    </>
  );

  return (
    <div className="Authentication">
      <h1 className="AuthenticationFormTitle">{actionName}</h1>
      <form className="AuthenticationForm" onSubmit={handleSubmit}>
        <Input
          name="Username"
          id="username"
          placeholder="Enter your username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          errors={formErrors.username}
        />
        <Input
          name="Password"
          id="password"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          errors={formErrors.password}
        />
        {!isOnLoginPage && (
          <>
            <Input
              name="Confirm password"
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              errors={formErrors.confirmPassword}
            />
            <Input
              name="Email"
              id="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              errors={formErrors.email}
            />
          </>
        )}
        <Button type="submit" display="Primary">
          {actionName}
        </Button>
        <Button type="reset" display="Ghost" onClick={handleSwitch}>
          {isOnLoginPage ? 'No account yet?' : 'Already sign in?'}
        </Button>
      </form>
    </div>
  );
}

export default Authentication;
