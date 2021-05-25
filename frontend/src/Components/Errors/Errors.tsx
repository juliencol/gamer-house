import './Errors.css';

interface propsErrors {
  errors: Array<string>;
}

function Errors(props: propsErrors) {
  if (props.errors) {
    return (
      <div className="Errors">
        {props.errors.map((error) => (
          <span key={error} className="Error">
            {error}
          </span>
        ))}
      </div>
    );
  }
  return <></>;
}

export default Errors;
