import { ChangeEvent } from 'react';
import { formMaximalFields } from '../../Authentication/Authentication';
import Errors from '../Errors/Errors';
import './Input.css';

interface propsInput {
  name: string;
  type: string;
  id: formMaximalFields;
  placeholder: string;
  value: string;
  errors: Array<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: propsInput) {
  return (
    <>
      <label className="Label" htmlFor={props.id}>
        {props.name}
      </label>
      <input
        className="Input"
        required={false}
        name={props.id}
        id={props.id}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <Errors errors={props.errors} />
    </>
  );
}

export default Input;
