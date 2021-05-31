import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Input from 'Components/Globals/Input/Input';
import Button from 'Components/Globals/Button/Button';
import './Authentication.css';
import useFetch from 'Components/Fetch/useFetch';
import { authReq } from 'Components/Fetch/request';

interface propsAuthentication {
  setAuthentication: (state: boolean) => void;
  refresh: () => void;
}

const ERRORS_VALUES = {
  empty: () => `This field is empty!`,
  tooShort: (name: string, minimalLength: number) =>
    `The ${name} is too short! (must be longer than ${minimalLength})`,
};

const MINIMAL_FIELDS = ['email', 'password'];
export type formMinimalFields = 'email' | 'password';
export type formMaximalFields =
  | formMinimalFields
  | 'confirmPassword'
  | 'pseudo'
  | 'birthDate';

function Authentication(props: propsAuthentication) {
  const { data, setRequest } = useFetch<{ accessToken: string } | undefined>(undefined);

  const refresh = props.refresh;
  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      refresh();
    }
  }, [data]);

  const [isOnLoginPage, setIsOnLoginPage] = useState(true);

  const defaultFormValue: { [key in formMaximalFields]: string } = {
    pseudo: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthDate: '',
  };
  const [formData, setFormData] = useState(defaultFormValue);

  const defaultErrors: { [key in formMaximalFields]: Array<string> } = {
    pseudo: [],
    password: [],
    confirmPassword: [],
    email: [],
    birthDate: [],
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
        case 'pseudo':
          currentErrors.push(...pseudoValidation(value));
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
        case 'birthDate':
          currentErrors.push(...birthDateVerification(value));
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

  function pseudoValidation(value: string) {
    const errorsArray: Array<string> = [];
    if (value.length < 5) {
      errorsArray.push(ERRORS_VALUES.tooShort('pseudo', 5));
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
    if (value.search('[a-zA-Z0-9]*[^@]@{1}[a-zA-Z0-9]*[.][a-zA-Z]+') === -1) {
      errorsArray.push('The email is not valid');
    }
    return errorsArray;
  }

  function birthDateVerification(value: string) {
    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthLeft = today.getMonth() - birthDate.getMonth();
    if (monthLeft < 0 || (monthLeft === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const errorsArray: Array<string> = [];
    if (age < 18) {
      errorsArray.push(
        'The birthdate is invalid! You must be older than 18 years old to use this website.'
      );
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

    const request = isOnLoginPage
      ? authReq().login(formData)
      : authReq().register(formData);

    setRequest(request);
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
          name="Email"
          id="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          errors={formErrors.email}
          value={formData.email}
        />
        <Input
          name="Password"
          id="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          errors={formErrors.password}
          value={formData.password}
        />
        {!isOnLoginPage && (
          <>
            <Input
              name="Confirm password"
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              onChange={handleChange}
              errors={formErrors.confirmPassword}
              value={formData.confirmPassword}
            />
            <Input
              name="Pseudo"
              id="pseudo"
              placeholder="Enter your pseudo"
              type="text"
              onChange={handleChange}
              errors={formErrors.pseudo}
              value={formData.pseudo}
            />

            <Input
              name="Birth date"
              id="birthDate"
              placeholder="Enter your birthdate"
              type="date"
              onChange={handleChange}
              errors={formErrors.birthDate}
              value={formData.birthDate}
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
